const router = require("express").Router();
const rateLimit = require("express-rate-limit");
const { limiterConfig } = require("../utils/configs");
const {
  validateCreateUser,
  validateLogin,
} = require("../middlewares/validation");
const { createUser, login } = require("../controllers/users");
const userRouter = require("./routes/users");
const proxyDbRoute = require("./routes/proxyDb");

const authLimiter = rateLimit({ ...limiterConfig, max: 5 });

router.post("/signup", authLimiter, validateCreateUser, createUser);
router.post("/signin", authLimiter, validateLogin, login);
router.use("/users", userRouter);
router.use("/proxydb", proxyDbRoute);

module.exports = router;
