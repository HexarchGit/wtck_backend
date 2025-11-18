const AppError = require("./AppError");

module.exports = class AuthError extends AppError {
  constructor(message = "Invalid email or password") {
    super(message, 401);
  }
};
