
const bcrypt = require('bcrypt');
const User = require('../models/User');
const Patient = require('../models/Patient');

exports.viewLogin = (req, res) => res.render('auth/login', { error: null });

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).lean();
    if (!user) return res.status(401).render('auth/login', { error: 'Invalid credentials' });

    if (user.role !== 'patient') {
      return res.status(403).render('auth/login', { error: 'Only patient accounts can log in here' });
    }

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).render('auth/login', { error: 'Invalid credentials' });

    req.session.user = { _id: user._id, email: user.email, role: user.role, patientId: user.patientId };
    return res.redirect('/profile'); // go straight to profile
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).render('auth/login', { error: 'Something went wrong' });
  }
};

exports.logout = (req, res) => req.session.destroy(() => res.redirect('/'));

exports.viewSignupPatient = (_req, res) => res.render('auth/signup-patient', { error: null, form: {} });

exports.signupPatient = async (req, res) => {
  try {
    const { fullName, dob, email, password, confirmPassword } = req.body;
    if (password !== confirmPassword)
      return res.status(400).render('auth/signup-patient', { error: 'Passwords do not match', form: req.body });

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).render('auth/signup-patient', { error: 'Email already in use', form: req.body });

    const patient = await Patient.create({ full_name: fullName, dob, email });
    const passwordHash = await bcrypt.hash(password, 12);
    const user = await User.create({ email, passwordHash, role: 'patient', patientId: patient._id });

    req.session.user = { _id: user._id, email, role: 'patient', patientId: patient._id };
    return res.redirect('/profile');
  } catch (err) {
    console.error('Signup patient error:', err);
    return res.status(500).render('auth/signup-patient', { error: 'Failed to sign up', form: req.body });
  }
};