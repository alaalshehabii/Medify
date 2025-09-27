const Medication = require('../models/Medication');

exports.index = async (req, res) => {
  const medications = await Medication.find().sort('name');
  res.render('medications/index', { medications });
};
exports.new = (req, res) => res.render('medications/new');
exports.create = async (req, res) => {
  await Medication.create(req.body);
  res.redirect('/medications');
};
exports.show = async (req, res) => {
  const medication = await Medication.findById(req.params.id);
  res.render('medications/show', { medication });
};
exports.edit = async (req, res) => {
  const medication = await Medication.findById(req.params.id);
  res.render('medications/edit', { medication });
};
exports.update = async (req, res) => {
  await Medication.findByIdAndUpdate(req.params.id, req.body);
  res.redirect(`/medications/${req.params.id}`);
};
exports.destroy = async (req, res) => {
  await Medication.findByIdAndDelete(req.params.id);
  res.redirect('/medications');
};
