const bcrypt = require('bcrypt');
const User = require('../models/User');

exports.getSignup = (req, res) => {
  if (req.session.userId) return res.redirect('/');
  res.render('auth/signup', { title: 'Sign up' });
};

exports.postSignup = async (req, res) => {
  try {
    const { fullName, password, confirmPassword } = req.body;
    if (!fullName || !password || !confirmPassword) {
      req.session.flash = { type: 'error', message: 'All fields required.' };
      return res.redirect('/auth/signup');
    }
    if (password !== confirmPassword) {
      req.session.flash = { type: 'error', message: 'Passwords do not match.' };
      return res.redirect('/auth/signup');
    }
    if (password.length < 4) {
      req.session.flash = { type: 'error', message: 'Password must be at least 4 characters.' };
      return res.redirect('/auth/signup');
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ fullName: fullName.trim(), passwordHash });
    req.session.userId = user._id.toString();
    req.session.user = { _id: user._id.toString(), fullName: user.fullName };
    req.session.flash = { type: 'success', message: `Welcome, ${user.fullName.split(' ')[0]}!` };
    res.redirect('/');
  } catch (err) {
    console.error(err);
    req.session.flash = { type: 'error', message: 'Could not create account.' };
    res.redirect('/auth/signup');
  }
};

exports.getLogin = (req, res) => {
  if (req.session.userId) return res.redirect('/');
  res.render('auth/login', { title: 'Log in' });
};

exports.postLogin = async (req, res) => {
  try {
    const { fullName, password } = req.body;
    const user = await User.findOne({ fullName: fullName?.trim() });
    if (!user) {
      req.session.flash = { type: 'error', message: 'Invalid name or password.' };
      return res.redirect('/auth/login');
    }
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) {
      req.session.flash = { type: 'error', message: 'Invalid name or password.' };
      return res.redirect('/auth/login');
    }
    req.session.userId = user._id.toString();
    req.session.user = { _id: user._id.toString(), fullName: user.fullName };
    req.session.flash = { type: 'success', message: `Welcome back, ${user.fullName.split(' ')[0]}!` };
    res.redirect('/');
  } catch (err) {
    console.error(err);
    req.session.flash = { type: 'error', message: 'Login failed.' };
    res.redirect('/auth/login');
  }
};

exports.logout = (req, res) => {
  req.session.destroy(() => res.redirect('/auth/login'));
};