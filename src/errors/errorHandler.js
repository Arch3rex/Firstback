function errorHandler(err, req, res, next) {
  console.error(err);
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
}
module.exports = errorHandler;
