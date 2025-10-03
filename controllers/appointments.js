// controllers/appointments.js
const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');

/** Build 30-minute slots in 12-hour format, e.g., "12:00 AM", "12:30 AM", ... "11:30 PM" */
function buildSlots12() {
  const slots = [];
  for (let h = 0; h < 24; h++) {
    for (let m of [0, 30]) {
      const ampm = h >= 12 ? 'PM' : 'AM';
      let hour12 = h % 12;
      if (hour12 === 0) hour12 = 12;
      const hh = String(hour12).padStart(2, '0');
      const mm = String(m).padStart(2, '0');
      slots.push(`${hh}:${mm} ${ampm}`);
    }
  }
  return slots;
}

/** Parse "YYYY-MM-DD" + "hh:mm AM/PM" → Date (local time) */
function parseDateAndTime12(dateStr, time12) {
  if (!dateStr || !time12) return null;
  const m = time12.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!m) return null;
  let [_, hStr, minStr, ap] = m;
  let h = parseInt(hStr, 10);
  const mins = parseInt(minStr, 10);
  const AM = ap.toUpperCase() === 'AM';
  if (!AM && h < 12) h += 12;
  if (AM && h === 12) h = 0;
  const hh = String(h).padStart(2, '0');
  const mm = String(mins).padStart(2, '0');
  // Construct local time — browsers send just date; server interprets as local when no Z suffix.
  const dt = new Date(`${dateStr}T${hh}:${mm}:00`);
  if (isNaN(dt)) return null;
  dt.setSeconds(0, 0);
  // Safety: snap to 00 or 30
  dt.setMinutes(dt.getMinutes() < 30 ? 0 : (dt.getMinutes() < 60 ? 30 : 0));
  return dt;
}

exports.index = async (req, res) => {
  const [doctors, appts] = await Promise.all([
    Doctor.find({}).sort('fullName').lean(),
    Appointment.find({ user: req.session.userId })
      .populate('doctor')
      .sort({ startsAt: 1 })
      .lean()
  ]);
  const slots = buildSlots12();
  res.render('appointments/index', { title: 'My Appointments', doctors, appts, slots });
};

exports.create = async (req, res) => {
  try {
    const { doctor, date, time12, notes } = req.body;
    const startsAt = parseDateAndTime12(date, time12);
    if (!doctor || !startsAt) {
      req.session.flash = { type: 'error', message: 'Pick a doctor, date, and time.' };
      return res.redirect('/appointments');
    }
    const endsAt = new Date(startsAt.getTime() + 30 * 60000);

    // Enforce uniqueness: doctor + startsAt
    const clash = await Appointment.findOne({ doctor, startsAt });
    if (clash) {
      req.session.flash = { type: 'error', message: 'That slot is already taken. Choose another.' };
      return res.redirect('/appointments');
    }

    await Appointment.create({
      user: req.session.userId,
      doctor,
      startsAt,
      endsAt,
      notes: notes?.trim()
    });

    req.session.flash = { type: 'success', message: 'Appointment booked.' };
    res.redirect('/appointments');
  } catch (e) {
    console.error(e);
    req.session.flash = { type: 'error', message: 'Failed to book appointment.' };
    res.redirect('/appointments');
  }
};

exports.editForm = async (req, res) => {
  const appt = await Appointment.findOne({ _id: req.params.id, user: req.session.userId })
    .populate('doctor')
    .lean();
  if (!appt) return res.status(404).render('404', { title: 'Not found' });
  const doctors = await Doctor.find({}).sort('fullName').lean();

  // Pre-fill date and time (12-hour)
  const d = new Date(appt.startsAt);
  const dateValue = new Date(d.getTime() - d.getTimezoneOffset() * 60000) // keep date consistent
    .toISOString()
    .slice(0, 10);
  const hr = d.getHours();
  const min = d.getMinutes();
  const ampm = hr >= 12 ? 'PM' : 'AM';
  let hour12 = hr % 12;
  if (hour12 === 0) hour12 = 12;
  const time12 = `${String(hour12).padStart(2, '0')}:${String(min).padStart(2, '0')} ${ampm}`;

  const slots = buildSlots12();
  res.render('appointments/edit', { title: 'Edit Appointment', appt, doctors, dateValue, time12, slots });
};

exports.update = async (req, res) => {
  try {
    const { date, time12, doctor, notes } = req.body;
    const startsAt = parseDateAndTime12(date, time12);
    if (!startsAt || !doctor) {
      req.session.flash = { type: 'error', message: 'Invalid date/time.' };
      return res.redirect('/appointments');
    }
    const endsAt = new Date(startsAt.getTime() + 30 * 60000);

    const clash = await Appointment.findOne({
      _id: { $ne: req.params.id },
      doctor,
      startsAt
    });
    if (clash) {
      req.session.flash = { type: 'error', message: 'That slot is already taken.' };
      return res.redirect('/appointments');
    }

    await Appointment.updateOne(
      { _id: req.params.id, user: req.session.userId },
      { $set: { doctor, startsAt, endsAt, notes: notes?.trim() } }
    );

    req.session.flash = { type: 'success', message: 'Appointment updated.' };
    res.redirect('/appointments');
  } catch (e) {
    console.error(e);
    req.session.flash = { type: 'error', message: 'Failed to update appointment.' };
    res.redirect('/appointments');
  }
};

exports.remove = async (req, res) => {
  try {
    await Appointment.deleteOne({ _id: req.params.id, user: req.session.userId });
    req.session.flash = { type: 'success', message: 'Appointment canceled.' };
  } catch (e) {
    console.error(e);
    req.session.flash = { type: 'error', message: 'Failed to cancel appointment.' };
  }
  res.redirect('/appointments');
};