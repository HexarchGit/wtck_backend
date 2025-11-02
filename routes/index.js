const router = require("express").Router();
const rateLimit = require("express-rate-limit");
const { LIMITERCONFIG } = require("../utils/configs");
const { NotFoundError } = require("../utils/errors");
const {
  validateCreateUser,
  validateLogin,
} = require("../middlewares/validation");
const { createUser, login } = require("../controllers/users");
const userRouter = require("./routes/users");
const recipesRoute = require("./routes/recipes");
const favoritesRoute = require("./routes/favorites");

const authLimiter = rateLimit({ ...LIMITERCONFIG, max: 5 });

router.post("/signup", authLimiter, validateCreateUser, createUser);
router.post("/signin", authLimiter, validateLogin, login);
router.use("/users", userRouter);
router.use("/recipes", recipesRoute);
router.use("/favorites", favoritesRoute);
router.use((_req, _res, next) => {
  next(new NotFoundError("Requested resource not found"));
});

module.exports = router;
