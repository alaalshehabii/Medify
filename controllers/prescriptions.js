// controllers/prescriptions.js — CRUD for prescriptions (links patient + medication)
const Prescription = require('../models/Prescription');

exports.index = async (_req, res) => {
  try {
    const prescriptions = await Prescription.find().sort({ start_date: -1 }).limit(50).lean();
    res.render('prescriptions/index', { prescriptions });
  } catch (err) {
    console.error('Prescriptions#index error:', err);
    res.status(500).render('prescriptions/index', { prescriptions: [] });
  }
};

exports.new = (_req, res) => res.render('prescriptions/new');

exports.create = async (req, res) => {
  try {
    const { patient_id, medication_id, dosage, frequency, start_date, end_date, refills } = req.body;
    await Prescription.create({
      patient_id, medication_id, dosage, frequency,
      start_date: start_date ? new Date(start_date) : undefined,
      end_date:   end_date ? new Date(end_date) : undefined,
      refills: refills ? Number(refills) : 0
    });
    res.redirect('/prescriptions');
  } catch (err) {
    console.error('Prescriptions#create error:', err);
    res.status(400).render('prescriptions/new', { error: 'Could not create prescription' });
  }
};

exports.show = async (req, res) => {
  try {
    const prescription = await Prescription.findById(req.params.id).lean();
    if (!prescription) return res.status(404).send('Not found');
    res.render('prescriptions/show', { prescription });
  } catch (err) {
    console.error('Prescriptions#show error:', err);
    res.status(500).send('Error');
  }
};

exports.edit = async (req, res) => {
  try {
    const prescription = await Prescription.findById(req.params.id).lean();
    if (!prescription) return res.status(404).send('Not found');
    res.render('prescriptions/edit', { prescription });
  } catch (err) {
    console.error('Prescriptions#edit error:', err);
    res.status(500).send('Error');
  }
};

exports.update = async (req, res) => {
  try {
    const { patient_id, medication_id, dosage, frequency, start_date, end_date, refills } = req.body;
    await Prescription.findByIdAndUpdate(
      req.params.id,
      {
        patient_id, medication_id, dosage, frequency,
        start_date: start_date ? new Date(start_date) : undefined,
        end_date:   end_date ? new Date(end_date) : undefined,
        refills: refills ? Number(refills) : 0
      },
      { runValidators: true }
    );
    res.redirect(`/prescriptions/${req.params.id}`);
  } catch (err) {
    console.error('Prescriptions#update error:', err);
    res.status(400).send('Update failed');
  }
};

exports.destroy = async (req, res) => {
  try {
    await Prescription.findByIdAndDelete(req.params.id);
    res.redirect('/prescriptions');
  } catch (err) {
    console.error('Prescriptions#destroy error:', err);
    res.status(500).send('Delete failed');
  }
};
