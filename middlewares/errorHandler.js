const { AppError, ServerError } = require("../utils/errors");

const serverError = new ServerError();

module.exports = (error, _req, res, _next) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).send({ message: error.message });
  }
  return res
    .status(serverError.statusCode)
    .send({ message: serverError.message });
};
