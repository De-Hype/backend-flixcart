const AppError = require("../utils/AppError");
require("dotenv").config();

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value} `;
  return new AppError(message, 503);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(message, 503);
};

const handleDuplicateErrorDB = (err) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  const message = `Duplicate field ${value}. Please enter another value!`;
  return new AppError(message, 503);
};

const sendProdError = (err, res) => {
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: "error",
      message: "Something went wrong.",
    });
  }
};

const sendDevError = (err, res) => {
    
  res.status(err.statusCode).json({
    status: err.status,
    message:err.message,
    err:err,
    
  });
};
const Environment = 'production';
const GlobalErrorHandler = (err, req, res, next) => {
  err.status = err.status || "error";
  err.statusCode = err.statusCode || 500;
 
  if (process.env.NODE_ENV === "development") {
    
    return sendDevError(err, res);
  }
  if (process.env.NODE_ENV === "production") {
      let error = { ...err };
    if (error.name === "CastError") error = handleCastErrorDB();
    if (error.name === "ValidationError") error = handleValidationErrorDB();
    if (error.code === 11000) error =handleDuplicateErrorDB();
    
    sendProdError(error, res);
    return;
  }
};

module.exports = GlobalErrorHandler
