// controllers/medications.js — CRUD for medication catalog
const Medication = require('../models/Medication');

exports.index = async (_req, res) => {
  try {
    const medications = await Medication.find().sort({ name: 1 }).lean();
    res.render('medications/index', { medications });
  } catch (err) {
    console.error('Medications#index error:', err);
    res.status(500).render('medications/index', { medications: [] });
  }
};

exports.new = (_req, res) => res.render('medications/new');

exports.create = async (req, res) => {
  try {
    const { name, form, strength } = req.body;
    await Medication.create({ name, form, strength });
    res.redirect('/medications');
  } catch (err) {
    console.error('Medications#create error:', err);
    res.status(400).render('medications/new', { error: 'Could not add medication' });
  }
};

exports.show = async (req, res) => {
  try {
    const medication = await Medication.findById(req.params.id).lean();
    if (!medication) return res.status(404).send('Not found');
    res.render('medications/show', { medication });
  } catch (err) {
    console.error('Medications#show error:', err);
    res.status(500).send('Error');
  }
};

exports.edit = async (req, res) => {
  try {
    const medication = await Medication.findById(req.params.id).lean();
    if (!medication) return res.status(404).send('Not found');
    res.render('medications/edit', { medication });
  } catch (err) {
    console.error('Medications#edit error:', err);
    res.status(500).send('Error');
  }
};

exports.update = async (req, res) => {
  try {
    const { name, form, strength } = req.body;
    await Medication.findByIdAndUpdate(req.params.id, { name, form, strength }, { runValidators: true });
    res.redirect(`/medications/${req.params.id}`);
  } catch (err) {
    console.error('Medications#update error:', err);
    res.status(400).send('Update failed');
  }
};

exports.destroy = async (req, res) => {
  try {
    await Medication.findByIdAndDelete(req.params.id);
    res.redirect('/medications');
  } catch (err) {
    console.error('Medications#destroy error:', err);
    res.status(500).send('Delete failed');
  }
};
