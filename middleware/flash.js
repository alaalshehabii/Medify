module.exports = function flash(type, message) {
  return (req, _res, next) => {
    req.session.flash = { type, message };
    next();
  };
};