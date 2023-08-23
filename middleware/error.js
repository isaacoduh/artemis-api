const sequelize = require("sequelize");
const httpStatus = require("http-status");
const config = require("../config/config");
const logger = require("../config/logger");
const ApiError = require("../utils/request/ApiError");
const { errorResponse } = require("../utils/request/ApiResponder");

const errorConverter = (err, req, res, next) => {
  let error = err;
  if (!(error instanceof ApiError || error instanceof sequelize.Error)) {
    const statusCode = error.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    error = new ApiError(statusCode, message, false, err.stack);
  }
  next(error);
};

const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;
  statusCode = statusCode || httpStatus.INTERNAL_SERVER_ERROR;
  if (statusCode === httpStatus.INTERNAL_SERVER_ERROR) {
    message = "We have a problem, please check back later";
  }
  res.locals.errorMessage = err.message;
  if (
    statusCode === httpStatus.INTERNAL_SERVER_ERROR ||
    config.env === "test"
  ) {
    logger.error(err);
    if (err instanceof sequelize.Error) {
      logger.error(err.parent);
    }
  }
  return errorResponse(
    res,
    message,
    statusCode,
    config.env === "development" && { stack: err.stack }
  );
};

module.exports = { errorConverter, errorHandler };
