const Medication = require('../models/Medication');

exports.index = async (req, res) => {
  const meds = await Medication.find({ user: req.session.userId }).sort('-createdAt').lean();
  res.render('medications/index', { title: 'My Medications', meds });
};

exports.create = async (req, res) => {
  const { name, dosage, timesPerDay, timing = [], notes } = req.body;
  try {
    await Medication.create({
      user: req.session.userId,
      name: name?.trim(),
      dosage: dosage?.trim(),
      timesPerDay: Number(timesPerDay || 1),
      timing: Array.isArray(timing) ? timing : [timing].filter(Boolean),
      notes: notes?.trim()
    });
    req.session.flash = { type: 'success', message: 'Medication added.' };
  } catch (e) {
    console.error(e);
    req.session.flash = { type: 'error', message: 'Failed to add medication.' };
  }
  res.redirect('/medications');
};

exports.editForm = async (req, res) => {
  const med = await Medication.findOne({ _id: req.params.id, user: req.session.userId }).lean();
  if (!med) return res.status(404).render('404', { title: 'Not found' });
  res.render('medications/edit', { title: 'Edit Medication', med });
};

exports.update = async (req, res) => {
  const { name, dosage, timesPerDay, timing = [], notes } = req.body;
  try {
    await Medication.updateOne(
      { _id: req.params.id, user: req.session.userId },
      {
        $set: {
          name: name?.trim(),
          dosage: dosage?.trim(),
          timesPerDay: Number(timesPerDay || 1),
          timing: Array.isArray(timing) ? timing : [timing].filter(Boolean),
          notes: notes?.trim()
        }
      }
    );
    req.session.flash = { type: 'success', message: 'Medication updated.' };
  } catch (e) {
    console.error(e);
    req.session.flash = { type: 'error', message: 'Failed to update medication.' };
  }
  res.redirect('/medications');
};

exports.remove = async (req, res) => {
  try {
    await Medication.deleteOne({ _id: req.params.id, user: req.session.userId });
    req.session.flash = { type: 'success', message: 'Medication deleted.' };
  } catch (e) {
    console.error(e);
    req.session.flash = { type: 'error', message: 'Failed to delete medication.' };
  }
  res.redirect('/medications');
};