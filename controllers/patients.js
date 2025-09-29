// controllers/patients.js — CRUD for patients
const Patient = require('../models/Patient');

exports.index = async (_req, res) => {
  try {
    const patients = await Patient.find().sort({ createdAt: -1 }).lean();
    res.render('patients/index', { patients });
  } catch (err) {
    console.error('Patients#index error:', err);
    res.status(500).render('patients/index', { patients: [] });
  }
};

exports.new = (_req, res) => res.render('patients/new');

exports.create = async (req, res) => {
  try {
    const { full_name, dob, allergies, phone, email } = req.body;
    await Patient.create({ full_name, dob, allergies, phone, email });
    res.redirect('/patients');
  } catch (err) {
    console.error('Patients#create error:', err);
    res.status(400).render('patients/new', { error: 'Could not create patient' });
  }
};

exports.show = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id).lean();
    if (!patient) return res.status(404).send('Not found');
    res.render('patients/show', { patient });
  } catch (err) {
    console.error('Patients#show error:', err);
    res.status(500).send('Error');
  }
};

exports.edit = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id).lean();
    if (!patient) return res.status(404).send('Not found');
    res.render('patients/edit', { patient });
  } catch (err) {
    console.error('Patients#edit error:', err);
    res.status(500).send('Error');
  }
};

exports.update = async (req, res) => {
  try {
    const { full_name, dob, allergies, phone, email } = req.body;
    await Patient.findByIdAndUpdate(req.params.id, { full_name, dob, allergies, phone, email }, { runValidators: true });
    res.redirect(`/patients/${req.params.id}`);
  } catch (err) {
    console.error('Patients#update error:', err);
    res.status(400).send('Update failed');
  }
};

exports.destroy = async (req, res) => {
  try {
    await Patient.findByIdAndDelete(req.params.id);
    res.redirect('/patients');
  } catch (err) {
    console.error('Patients#destroy error:', err);
    res.status(500).send('Delete failed');
  }
};
