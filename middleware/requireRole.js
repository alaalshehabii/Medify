// middleware/requireRole.js — ensures the current user has the required role

module.exports = function requireRole(role) {
  return (req, res, next) => {
    if (req.session?.user?.role === role) return next();
    return res.status(403).send('Forbidden');
  };
};
