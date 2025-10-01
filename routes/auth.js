// routes/auth.js — super simple auth (no hashing). NOT for production use.
const express = require('express');
const router = express.Router();
const User = require('../models/user');

/* ---------- helpers ---------- */
function buildUserDoc({ name, email, password }) {
  const doc = { name, email };

  // Fill whichever fields your schema defines
  if (User.schema.path('password'))      doc.password = password;
  if (User.schema.path('passwordHash'))  doc.passwordHash = password;      // <- satisfies "passwordHash is required"
  if (User.schema.path('hashedPassword'))doc.hashedPassword = password;
  if (User.schema.path('username'))      doc.username = name;
  if (User.schema.path('fullName'))      doc.fullName = name;
  if (User.schema.path('displayName'))   doc.displayName = name;
  if (User.schema.path('role'))          doc.role = 'patient';
  return doc;
}

function getStoredPassword(user) {
  return (
    user?.password ??
    user?.passwordHash ??
    user?.hashedPassword ??
    ''
  );
}

/* ---------- GET: signup ---------- */
router.get('/signup', (req, res) => {
  res.render('auth/sign-up', { error: null });
});

/* ---------- POST: signup (plain text + confirm) ---------- */
router.post('/signup', async (req, res) => {
  try {
    const name = String(req.body.name || '').trim();
    const email = String(req.body.email || '').trim().toLowerCase();
    const password = String(req.body.password || '').trim();
    const confirm  = String(req.body.confirm  || '').trim();

    if (!name || !email || !password || !confirm) {
      return res.status(400).render('auth/sign-up', { error: 'All fields are required.' });
    }
    if (password !== confirm) {
      return res.status(400).render('auth/sign-up', { error: 'Passwords do not match.' });
    }

    const exists = await User.findOne({ email }).lean();
    if (exists) {
      return res.status(400).render('auth/sign-up', { error: 'Email is already in use.' });
    }

    const doc = buildUserDoc({ name, email, password });
    const user = await User.create(doc);

    req.session.user = { _id: user._id.toString(), email: user.email, name: user.name || user.username || 'User' };
    return res.redirect('/dashboard');
  } catch (err) {
    console.error('signup error:', err);
    // Duplicate key friendly message
    if (err && err.code === 11000) {
      return res.status(400).render('auth/sign-up', { error: 'Email is already in use.' });
    }
    // Surface first validation message if present
    if (err?.name === 'ValidationError' && err.errors) {
      const first = Object.values(err.errors)[0];
      if (first?.message) {
        return res.status(400).render('auth/sign-up', { error: first.message });
      }
    }
    return res.status(500).render('auth/sign-up', { error: err.message || 'Could not create account. Please try again.' });
  }
});

/* ---------- GET: login ---------- */
router.get('/login', (req, res) => {
  res.render('auth/login', { error: null });
});

/* ---------- POST: login (plain text compare) ---------- */
router.post('/login', async (req, res) => {
  try {
    const email = String(req.body.email || '').trim().toLowerCase();
    const password = String(req.body.password || '').trim();

    if (!email || !password) {
      return res.status(400).render('auth/login', { error: 'Email and password are required.' });
    }

    const user = await User.findOne({ email }).lean();
    if (!user || getStoredPassword(user) !== password) {
      return res.status(400).render('auth/login', { error: 'Invalid email or password.' });
    }

    req.session.user = { _id: user._id.toString(), email: user.email, name: user.name || user.username || 'User' };
    const next = typeof req.query.next === 'string' ? req.query.next : '/dashboard';
    return res.redirect(next);
  } catch (err) {
    console.error('login error:', err);
    return res.status(500).render('auth/login', { error: err.message || 'Something went wrong.' });
  }
});

/* ---------- GET: logout ---------- */
router.get('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/'));
});

module.exports = router;
