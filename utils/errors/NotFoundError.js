const AppError = require("./AppError");

module.exports = class NotFoundError extends AppError {
  constructor(message = "Object not found") {
    super(message, 404);
  }
};
