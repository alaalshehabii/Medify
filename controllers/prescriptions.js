const Prescription = require('../models/Prescription');
const Patient = require('../models/Patient');
const Medication = require('../models/Medication');

exports.index = async (req, res) => {
  const prescriptions = await Prescription.find()
    .populate('patient_id')
    .populate('medication_id')
    .sort({ createdAt: -1 });
  res.render('prescriptions/index', { prescriptions });
};
exports.new = async (req, res) => {
  const patients = await Patient.find().sort('full_name');
  const medications = await Medication.find().sort('name');
  res.render('prescriptions/new', { patients, medications });
};
exports.create = async (req, res) => {
  await Prescription.create(req.body);
  res.redirect('/prescriptions');
};
exports.show = async (req, res) => {
  const prescription = await Prescription.findById(req.params.id)
    .populate('patient_id')
    .populate('medication_id');
  res.render('prescriptions/show', { prescription });
};
exports.edit = async (req, res) => {
  const prescription = await Prescription.findById(req.params.id);
  const patients = await Patient.find().sort('full_name');
  const medications = await Medication.find().sort('name');
  res.render('prescriptions/edit', { prescription, patients, medications });
};
exports.update = async (req, res) => {
  await Prescription.findByIdAndUpdate(req.params.id, req.body);
  res.redirect(`/prescriptions/${req.params.id}`);
};
exports.destroy = async (req, res) => {
  await Prescription.findByIdAndDelete(req.params.id);
  res.redirect('/prescriptions');
};
