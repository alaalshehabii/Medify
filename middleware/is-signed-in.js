// middleware/is-signed-in.js
module.exports = function isSignedIn(req, res, next) {
  if (req.session?.user) return next();
  // If not signed in, send to simple sign-in page
  return res.redirect('/auth/sign-in');
};

