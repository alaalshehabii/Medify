// controllers/auth.js
const express = require('express');
const router = express.Router();

// GET /auth/sign-in (simple form)
router.get('/sign-in', (req, res) => {
  res.render('auth/sign-in.ejs', { title: 'Sign In' });
});

// POST /auth/sign-in (stores username in session for demo)
router.post('/sign-in', (req, res) => {
  const { username } = req.body;
  if (!username?.trim()) {
    return res.status(400).send('Username is required');
  }
  req.session.user = { username: username.trim() };
  res.redirect('/vip-lounge');
});

// GET /auth/sign-out
router.get('/sign-out', (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('connect.sid');
    res.redirect('/');
  });
});

module.exports = router;


