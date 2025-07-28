const AppError = require("./AppError");
const NotFoundError = require("./NotFoundError");
const BadRequestError = require("./BadRequestError");
const ServerError = require("./ServerError");
const ConflictError = require("./ConflictError");
const AuthError = require("./AuthError");
const ForbiddenError = require("./ForbiddenError");

module.exports = {
  AppError,
  BadRequestError,
  NotFoundError,
  ServerError,
  ConflictError,
  AuthError,
  ForbiddenError,
};
