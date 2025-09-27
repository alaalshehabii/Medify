const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');

require('dotenv').config();
require('./config/database'); // makes the Mongo connection

const app = express();
const PORT = process.env.PORT || 3000;

// --- Views / Layouts ---
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layout'); // uses views/layout.ejs

// --- Static & Middleware ---
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// --- Routes ---
app.get('/', (req, res) => res.render('index'));

app.use('/patients', require('./routes/patients'));
app.use('/doctors', require('./routes/doctors'));
app.use('/appointments', require('./routes/appointments'));
app.use('/medications', require('./routes/medications'));
app.use('/prescriptions', require('./routes/prescriptions'));

// --- 404 ---
app.use((req, res) => res.status(404).send('Not Found'));

// --- Start ---
app.listen(PORT, () => {
  console.log(`✅ Medify running at http://localhost:${PORT}`);
});
