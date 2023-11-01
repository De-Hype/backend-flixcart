const NotFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};
const GlobalHandler = (err, req, res, next) => {
  console.log(err);
  let statusCode = res.statusCode || 200 ? 500 : res.statusCode;
  let message = err.message;

  //Custom errors
  res.status(statusCode).json({ message, stack: err.stack, err});
};
module.exports = GlobalHandler;
