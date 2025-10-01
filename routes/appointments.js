// routes/appointments.js
const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const doctors = require('../data/doctors');

function ensureAuth(req, res, next) {
  if (req.session?.user) return next();
  return res.redirect('/auth/login?next=' + encodeURIComponent(req.originalUrl));
}

// GET /appointments – show form (login required to submit) + user's bookings
router.get('/', async (req, res) => {
  const userId = req.session?.user?._id || req.session?.user?.id || null;
  const myAppointments = userId
    ? await Appointment.find({ userId }).sort({ start: 1 }).lean()
    : [];

  res.render('appointments/index', {
    doctors,
    myAppointments,
    canBook: Boolean(userId),
    msg: req.query.msg || null,
    err: req.query.err || null,
  });
});

// POST /appointments/book – create booking (30-min slot)
router.post('/book', ensureAuth, async (req, res) => {
  try {
    const { doctorKey, date, time } = req.body;

    // basic validation
    if (!doctorKey || !date || !time) {
      return res.redirect('/appointments?err=' + encodeURIComponent('Please choose doctor, date, and time.'));
    }

    const d = doctors.find(d => d.key === doctorKey);
    if (!d) {
      return res.redirect('/appointments?err=' + encodeURIComponent('Selected doctor is not valid.'));
    }

    const start = new Date(`${date}T${time}:00`);
    if (Number.isNaN(+start) || start < new Date()) {
      return res.redirect('/appointments?err=' + encodeURIComponent('Pick a valid future date & time.'));
    }

    const end = new Date(start.getTime() + 30 * 60 * 1000); // 30 minutes
    const userId = req.session.user._id || req.session.user.id;

    await Appointment.create({
      userId,
      doctorKey,
      doctorName: d.name,
      start,
      end,
    });

    return res.redirect('/appointments?msg=' + encodeURIComponent('Appointment booked.'));
  } catch (e) {
    // Duplicate (unique index) => slot already taken
    if (e && e.code === 11000) {
      return res.redirect('/appointments?err=' + encodeURIComponent('That time is no longer available. Please choose a different time.'));
    }
    console.error('Book error:', e);
    return res.redirect('/appointments?err=' + encodeURIComponent('Something went wrong. Please try again.'));
  }
});

module.exports = router;
