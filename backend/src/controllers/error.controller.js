require("dotenv").config();
const AppError = require("../utils/AppError");
const logger = require("../utils/logger");

function handleProductionError(error) {
  let err = { ...error };

  if (error.errors) err = handleValidationError(err);
  if (error.name === "JsonWebTokenError") err = handleJWTError();
  if (error.name === "TokenExpiredError") err = handleJWTExpiredError();
  if (error.name === "AppError") err.message = error.message;

  return err;
}

/*
 *    Error handlers
 */
const handleValidationError = (err) => {
  const errors = Object.values(err.errors).map((e) => e.msg);
  const message = `Invalid data: ${errors.join(". ")}`;
  return new AppError(message, 400);
};
const handleJWTError = () => new AppError("Invalid Token!", 400);
const handleJWTExpiredError = () =>
  new AppError("Your token has expired!", 401);

// Returns error to production format
function returnErrorProduction(error, res) {
  // If its an operational error, the returned message was treated
  if (error.isOperational) {
    return res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
    });
  }

  // If its not operational, returns a generic message
  logger.error("Production error:" + error);
  return res.status(500).json({
    status: "error",
    message: "Something went wrong!",
  });
}

// Returns error to development format
function returnErrorDevelopment(error, res) {
  return res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
}

// Error Handler
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (process.env.NODE_ENV === "development") {
    return returnErrorDevelopment(err, res);
  }
  // Handle possíveis erros
  const error = handleProductionError(err);
  return returnErrorProduction(error, res);
};
