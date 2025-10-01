// routes/doctors.js
const express = require('express');
const router = express.Router();

// Static doctors page (no search)
router.get('/', (_req, res) => {
  res.render('doctors/index', { title: 'Doctors' });
});

module.exports = router;