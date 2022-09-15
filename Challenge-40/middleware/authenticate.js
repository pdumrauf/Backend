const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  return res.redirect("/auth/login");
};

const isNotAuthenticated = (req, res, next) => {
  if (!req.isAuthenticated()) return next();
  return res.redirect("/index");
};

module.exports = { isAuthenticated, isNotAuthenticated };
