const AppError = require("./AppError");

module.exports = class ConflictError extends AppError {
  constructor(message = "Duplication happened") {
    super(message, 409);
  }
};
