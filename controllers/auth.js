// controllers/auth.js — signup, login, logout for patients & doctors
const bcrypt = require('bcrypt'); // if native fails on your machine, install & use 'bcryptjs'
const User = require('../models/user');
const Patient = require('../models/Patient');
const Doctor  = require('../models/Doctor');

// GET /auth/login
exports.viewLogin = (req, res) => res.render('auth/login', { error: null });

// POST /auth/login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).lean();
    if (!user) return res.status(401).render('auth/login', { error: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).render('auth/login', { error: 'Invalid credentials' });

    req.session.user = {
      _id: user._id,
      email: user.email,
      role: user.role,
      patientId: user.patientId,
      doctorId: user.doctorId
    };
    return res.redirect(user.role === 'doctor' ? '/dashboard/doctor' : '/dashboard/patient');
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).render('auth/login', { error: 'Something went wrong' });
  }
};

// GET /auth/logout
exports.logout = (req, res) => req.session.destroy(() => res.redirect('/'));

// GET /auth/signup/patient
exports.viewSignupPatient = (_req, res) => res.render('auth/signup-patient', { error: null, form: {} });

// POST /auth/signup/patient
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
    return res.redirect('/dashboard/patient');
  } catch (err) {
    console.error('Signup patient error:', err);
    return res.status(500).render('auth/signup-patient', { error: 'Failed to sign up', form: req.body });
  }
};

// GET /auth/signup/doctor
exports.viewSignupDoctor = (_req, res) => res.render('auth/signup-doctor', { error: null, form: {} });

// POST /auth/signup/doctor
exports.signupDoctor = async (req, res) => {
  try {
    const { fullName, specialty, licenseNumber, email, password, confirmPassword } = req.body;
    if (password !== confirmPassword)
      return res.status(400).render('auth/signup-doctor', { error: 'Passwords do not match', form: req.body });

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).render('auth/signup-doctor', { error: 'Email already in use', form: req.body });

    const doctor = await Doctor.create({ full_name: fullName, specialty, license_number: licenseNumber });
    const passwordHash = await bcrypt.hash(password, 12);
    const user = await User.create({ email, passwordHash, role: 'doctor', doctorId: doctor._id });

    req.session.user = { _id: user._id, email, role: 'doctor', doctorId: doctor._id };
    return res.redirect('/dashboard/doctor');
  } catch (err) {
    console.error('Signup doctor error:', err);
    return res.status(500).render('auth/signup-doctor', { error: 'Failed to sign up', form: req.body });
  }
};
