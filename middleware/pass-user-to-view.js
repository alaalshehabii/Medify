module.exports = function passUser(req, res, next) {
  res.locals.currentUser = req.session?.user || null;
  res.locals.flash = req.session?.flash || null;
  delete req.session?.flash;
  next();
};