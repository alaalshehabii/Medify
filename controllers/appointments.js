const Appointment = require('../models/Appointment');
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');

exports.index = async (req, res) => {
  const appts = await Appointment.find()
    .populate('patient_id')
    .populate('doctor_id')
    .sort({ datetime: -1 });
  res.render('appointments/index', { appts });
};
exports.new = async (req, res) => {
  const patients = await Patient.find().sort('full_name');
  const doctors = await Doctor.find().sort('full_name');
  res.render('appointments/new', { patients, doctors });
};
exports.create = async (req, res) => {
  await Appointment.create(req.body);
  res.redirect('/appointments');
};
exports.show = async (req, res) => {
  const appt = await Appointment.findById(req.params.id)
    .populate('patient_id')
    .populate('doctor_id');
  res.render('appointments/show', { appt });
};
exports.edit = async (req, res) => {
  const appt = await Appointment.findById(req.params.id);
  const patients = await Patient.find().sort('full_name');
  const doctors = await Doctor.find().sort('full_name');
  res.render('appointments/edit', { appt, patients, doctors });
};
exports.update = async (req, res) => {
  await Appointment.findByIdAndUpdate(req.params.id, req.body);
  res.redirect(`/appointments/${req.params.id}`);
};
exports.destroy = async (req, res) => {
  await Appointment.findByIdAndDelete(req.params.id);
  res.redirect('/appointments');
};
