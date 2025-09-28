// routes/dashboard.js — protected dashboards

const router = require('express').Router();
const isSignedIn = require('../middleware/isSignedIn');
const requireRole = require('../middleware/requireRole');
const dashboards = require('../controllers/dashboards');

router.get('/patient', isSignedIn, requireRole('patient'), dashboards.patient);
router.get('/doctor',  isSignedIn, requireRole('doctor'),  dashboards.doctor);

module.exports = router;
