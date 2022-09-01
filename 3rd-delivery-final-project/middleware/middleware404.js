const middleware404 = (req, res, next) => {
  return res.json({
      descripcion: `Route ${req.url} and method ${req.method} not implemented`,
  });
};

module.exports = middleware404;
