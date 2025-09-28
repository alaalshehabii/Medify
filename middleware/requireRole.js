// middleware/requireRole.js — require a specific role
module.exports = function requireRole(role) {
  return (req, res, next) => {
    if (req.session && req.session.user && req.session.user.role === role) return next();
    return res.status(403).send('Forbidden');
  };
};
