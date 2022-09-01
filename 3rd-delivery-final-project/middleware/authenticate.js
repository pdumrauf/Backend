const checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  return res.redirect("/auth/login");
};

const checkNotAuthenticated = (req, res, next) => {
  if (!req.isAuthenticated()) return next();
  return res.redirect("/index");
};

const admin = true;

const isAdmin = (req, res, next) => {
    if (admin) next();
    else
        return res.json({
            descripcion: `Route ${req.url} and method ${req.method} not authorized`,
        });
};

module.exports = { checkAuthenticated, checkNotAuthenticated, isAdmin };