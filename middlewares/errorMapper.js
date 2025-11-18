const {
  BadRequestError,
  NotFoundError,
  ConflictError,
} = require("../utils/errors");

module.exports = (error, _req, _res, next) => {
  console.error(`[${new Date().toISOString()}]: ${error.stack}`);
  if (error.name === "ValidationError" || error.name === "CastError")
    return next(new BadRequestError());
  if (error.name === "DocumentNotFoundError") return next(new NotFoundError());
  if (error.code === 11000) return next(new ConflictError());
  return next(error);
};
