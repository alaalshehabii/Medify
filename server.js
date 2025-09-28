const express = require('express');
const path = require('path');
const morgan = require('morgan');
const methodOverride = require('method-override');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const MongoStore = require('connect-mongo');

require('dotenv').config();
require('./config/database'); // ensure the filename matches your config (database.js or db.js)

const app = express();
const port = process.env.PORT || 3000;

// View engine / layouts
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layout'); // views/layout.ejs

// Static + core middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(morgan('dev'));

// Sessions (cookie stores only session id; data is in Mongo via connect-mongo)
app.set('trust proxy', 1); // safe behind proxies in prod
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'change-me',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
      ttl: 60 * 60 * 24 * 7 // 7 days
    }),
    cookie: {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
    }
  })
);

// Make session available to EJS
app.use((req, res, next) => {
  res.locals.session = req.session || null;
  next();
});

// Home (simple placeholder; keep your pretty homepage if you have one)
app.get('/', (req, res) => res.render('index'));

// Auth + dashboards
app.use('/auth', require('./routes/auth'));
app.use('/dashboard', require('./routes/dashboard'));

// Your existing CRUD resources stay as-is
app.use('/patients', require('./routes/patients'));
app.use('/doctors', require('./routes/doctors'));
app.use('/appointments', require('./routes/appointments'));
app.use('/medications', require('./routes/medications'));
app.use('/prescriptions', require('./routes/prescriptions'));

// 404
app.use((req, res) => res.status(404).send('Not Found'));

app.listen(port, () => {
  console.log(` Medify running at http://localhost:${port}`);
});