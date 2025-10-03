module.exports = function isSignedIn(req, res, next) {
  if (req.session && req.session.userId) return next();

  // allow auth pages and static assets
  const openPaths = ['/auth/login', '/auth/signup', '/auth/logout'];
  if (openPaths.includes(req.path) || req.path.startsWith('/auth') || req.path.startsWith('/img') || req.path.startsWith('/styles')) {
    return next();
  }

  return res.redirect('/auth/login');
};