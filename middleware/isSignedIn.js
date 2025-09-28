// middleware/isSignedIn.js — require a logged-in session
module.exports = function isSignedIn(req, res, next) {
  if (req.session && req.session.user) return next();
  return res.redirect('/auth/login');
};
