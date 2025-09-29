
const Patient = require('../models/Patient');

exports.view = async (req, res) => {
  try {
    const patientId = req.session?.user?.patientId;
    const patient = patientId ? await Patient.findById(patientId).lean() : null;
    if (!patient) return res.redirect('/auth/login');
    res.render('profile/edit', { patient, saved: false, error: null });
  } catch (err) {
    console.error('Profile#view error:', err);
    res.status(500).render('profile/edit', { patient: null, saved: false, error: 'Unable to load profile' });
  }
};

exports.update = async (req, res) => {
  try {
    const patientId = req.session?.user?.patientId;
    if (!patientId) return res.redirect('/auth/login');

    const { full_name, dob, allergies, phone, email } = req.body;
    await Patient.findByIdAndUpdate(
      patientId,
      { full_name, dob, allergies, phone, email },
      { runValidators: true }
    );
    const patient = await Patient.findById(patientId).lean();
    res.render('profile/edit', { patient, saved: true, error: null });
  } catch (err) {
    console.error('Profile#update error:', err);
    const patientId = req.session?.user?.patientId;
    const patient = patientId ? await Patient.findById(patientId).lean() : null;
    res.status(400).render('profile/edit', { patient, saved: false, error: 'Could not save changes' });
  }
};