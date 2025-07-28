const winston = require("winston");
const expressWinston = require("express-winston");

const messageFormatConsole = winston.format.combine(
  winston.format.timestamp(),
  winston.format.printf(
    ({ level, message, meta, timestamp }) =>
      `[${timestamp}][${level}]: ${meta.error?.stack || message}`
  )
);

const messageFormatLogFile = winston.format.combine(
  winston.format.timestamp(),
  winston.format.json()
);

module.exports.requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.Console({
      format: messageFormatConsole,
    }),
    new winston.transports.File({
      filename: "request.log",
      format: messageFormatLogFile,
    }),
  ],
});

module.exports.errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.Console({
      format: messageFormatConsole,
    }),
    new winston.transports.File({
      filename: "error.log",
      format: winston.format.json(),
    }),
  ],
});
