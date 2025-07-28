const AppError = require("./AppError");

module.exports = class ForbiddenError extends AppError {
  constructor(message = "This action is forbidden") {
    super(message, 403);
  }
};
