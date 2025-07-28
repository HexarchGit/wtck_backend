const AppError = require("./AppError");

module.exports = class BadRequestError extends AppError {
  constructor(message = "Invalid input") {
    super(message, 400);
  }
};
