// controllers/appointments.js — CRUD for appointments
const Appointment = require('../models/Appointment');

exports.index = async (_req, res) => {
  try {
    const appointments = await Appointment.find()
      .sort({ datetime: -1 })
      .limit(50)
      .lean();
    res.render('appointments/index', { appointments });
  } catch (err) {
    console.error('Appointments#index error:', err);
    res.status(500).render('appointments/index', { appointments: [] });
  }
};

exports.new = (_req, res) => res.render('appointments/new');

exports.create = async (req, res) => {
  try {
    const { patient_id, doctor_id, datetime, mode, status, notes } = req.body;
    await Appointment.create({
      patient_id,
      doctor_id,
      datetime: datetime ? new Date(datetime) : undefined,
      mode, status, notes
    });
    res.redirect('/appointments');
  } catch (err) {
    console.error('Appointments#create error:', err);
    res.status(400).render('appointments/new', { error: 'Could not create appointment' });
  }
};

exports.show = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id).lean();
    if (!appointment) return res.status(404).send('Not found');
    res.render('appointments/show', { appointment });
  } catch (err) {
    console.error('Appointments#show error:', err);
    res.status(500).send('Error');
  }
};

exports.edit = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id).lean();
    if (!appointment) return res.status(404).send('Not found');
    res.render('appointments/edit', { appointment });
  } catch (err) {
    console.error('Appointments#edit error:', err);
    res.status(500).send('Error');
  }
};

exports.update = async (req, res) => {
  try {
    const { patient_id, doctor_id, datetime, mode, status, notes } = req.body;
    await Appointment.findByIdAndUpdate(
      req.params.id,
      { patient_id, doctor_id, datetime: datetime ? new Date(datetime) : undefined, mode, status, notes },
      { runValidators: true }
    );
    res.redirect(`/appointments/${req.params.id}`);
  } catch (err) {
    console.error('Appointments#update error:', err);
    res.status(400).send('Update failed');
  }
};

exports.destroy = async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.redirect('/appointments');
  } catch (err) {
    console.error('Appointments#destroy error:', err);
    res.status(500).send('Delete failed');
  }
};