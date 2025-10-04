require('dotenv').config();
const path = require('path');
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const methodOverride = require('method-override');
const morgan = require('morgan');

const connectDB = require('./config/database');
const { seedDoctorsUpsert } = require('./config/seedDoctors');
const passUser = require('./middleware/pass-user-to-view');
const isSignedIn = require('./middleware/is-signed-in');

const app = express();

// DB + seed
(async () => {
  await connectDB();
  try {
    const changed = await seedDoctorsUpsert();
    console.log(` Ensured default doctors exist (changed/created: ${changed}).`);
  } catch (e) {
    console.warn(' Could not seed doctors:', e?.message || e);
  }
})();

// Views & Static
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Parsers & helpers
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(morgan('dev'));

// Sessions
app.use(session({
  secret: process.env.SESSION_SECRET || 'devsecret',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 }
}));

// Locals for all pages
app.use(passUser);

// Open routes
app.use('/auth', require('./routes/auth'));

// Gate the rest
app.use(isSignedIn);

// App routes
app.use('/', require('./routes/home'));
app.use('/doctors', require('./routes/doctors'));
app.use('/medications', require('./routes/medications'));
app.use('/appointments', require('./routes/appointments'));

// 404
app.use((req, res) => res.status(404).render('404', { title: 'Not found' }));

// 500
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).render('500', { title: 'Server error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(` Medify running on http://localhost:${PORT}`));