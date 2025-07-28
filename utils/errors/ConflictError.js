const AppError = require("./AppError");

module.exports = class ConflictError extends AppError {
  constructor(message = "There is already user with that data") {
    super(message, 409);
  }
};
