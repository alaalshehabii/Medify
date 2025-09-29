require('dotenv').config();

const path = require('path');
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const expressLayouts = require('express-ejs-layouts');

require('./config/database');

const app = express();

/* ---------- Views ---------- */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layout');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/* ---------- Static (no-cache in dev) ---------- */
app.use(
  express.static(path.join(__dirname, 'public'), {
    maxAge: 0, etag: false, lastModified: false,
  })
);

/* ---------- Sessions ---------- */
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'change-me',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
      dbName: 'medify',
      collectionName: 'sessions',
      touchAfter: 24 * 3600,
    }),
    cookie: {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
);

// expose session to all views
app.use((req, res, next) => { res.locals.session = req.session; next(); });

/* ---------- Routes ---------- */
const authRoutes = require('./routes/auth');
const dashRoutes = require('./routes/dashboard');
const profileRoutes = require('./routes/profile');   // NEW
const doctorRoutes = require('./routes/doctors');
const apptRoutes = require('./routes/appointments');
const medRoutes = require('./routes/medications');
const rxRoutes = require('./routes/prescriptions');

app.get('/', (req, res) => res.render('index'));
app.use('/auth', authRoutes);
app.use('/dashboard', dashRoutes);
app.use('/profile', profileRoutes);                   // NEW
// app.use('/patients', require('./routes/patients')); // removed from public UX
app.use('/doctors', doctorRoutes);
app.use('/appointments', apptRoutes);
app.use('/medications', medRoutes);
app.use('/prescriptions', rxRoutes);

app.use((_req, res) => res.status(404).send('Not found'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(` Medify running at http://localhost:${PORT}`));