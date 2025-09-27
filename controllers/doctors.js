const Doctor = require('../models/Doctor');

exports.index = async (req, res) => {
  const doctors = await Doctor.find().sort({ createdAt: -1 });
  res.render('doctors/index', { doctors });
};
exports.new = (req, res) => res.render('doctors/new');
exports.create = async (req, res) => {
  await Doctor.create(req.body);
  res.redirect('/doctors');
};
exports.show = async (req, res) => {
  const doctor = await Doctor.findById(req.params.id);
  res.render('doctors/show', { doctor });
};
exports.edit = async (req, res) => {
  const doctor = await Doctor.findById(req.params.id);
  res.render('doctors/edit', { doctor });
};
exports.update = async (req, res) => {
  await Doctor.findByIdAndUpdate(req.params.id, req.body);
  res.redirect(`/doctors/${req.params.id}`);
};
exports.destroy = async (req, res) => {
  await Doctor.findByIdAndDelete(req.params.id);
  res.redirect('/doctors');
};
