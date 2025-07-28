const { CORS_ORIGIN = "http://localhost:3000" } = process.env;

const limiterConfig = {
  windowMs: 15 * 60 * 1000,
  message: "Too many requests, try again later.",
};

const corsConfig = {
  origin: CORS_ORIGIN,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: ["Authorization", "Content-Type"],
};

module.exports = { limiterConfig, corsConfig };
