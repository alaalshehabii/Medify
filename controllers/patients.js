const Patient = require('../models/Patient');

exports.index = async (req, res) => {
  const patients = await Patient.find().sort({ createdAt: -1 });
  res.render('patients/index', { patients });
};
exports.new = (req, res) => res.render('patients/new');
exports.create = async (req, res) => {
  const { full_name, dob, phone, email, allergies } = req.body;
  const parsedAllergies = (allergies || '').split(',').map(s => s.trim()).filter(Boolean);
  await Patient.create({ full_name, dob, phone, email, allergies: parsedAllergies });
  res.redirect('/patients');
};
exports.show = async (req, res) => {
  const patient = await Patient.findById(req.params.id);
  res.render('patients/show', { patient });
};
exports.edit = async (req, res) => {
  const patient = await Patient.findById(req.params.id);
  res.render('patients/edit', { patient });
};
exports.update = async (req, res) => {
  const { full_name, dob, phone, email, allergies } = req.body;
  const parsedAllergies = (allergies || '').split(',').map(s => s.trim()).filter(Boolean);
  await Patient.findByIdAndUpdate(req.params.id, { full_name, dob, phone, email, allergies: parsedAllergies });
  res.redirect(`/patients/${req.params.id}`);
};
exports.destroy = async (req, res) => {
  await Patient.findByIdAndDelete(req.params.id);
  res.redirect('/patients');
};
