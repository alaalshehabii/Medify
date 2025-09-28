// middleware/isSignedIn.js — blocks access if not authenticated

module.exports = function isSignedIn(req, res, next) {
  if (req.session?.user) return next();
  return res.redirect('/auth/login');
};
