const jwt = require("jsonwebtoken");
const { AuthError } = require("../utils/errors");
const { JWTDEV } = require("../utils/constants");

const { JWT_SECRET = JWTDEV } = process.env;

module.exports = (req, _res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.match(/^Bearer\s/))
    throw new AuthError();
  const token = authorization.replace("Bearer ", "");
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch {
    throw new AuthError();
  }
  req.user = payload;
  return next();
};
