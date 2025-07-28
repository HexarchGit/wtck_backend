const AppError = require("./AppError");

module.exports = class ServerError extends AppError {
  constructor(message = "Internal server error") {
    super(message, 500);
  }
};
