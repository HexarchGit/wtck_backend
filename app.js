require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const { errors } = require("celebrate");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const helmet = require("helmet");
const hpp = require("hpp");
const { LIMITERCONFIG, CORSCONFIG } = require("./utils/configs");
const routes = require("./routes");

const errorMapper = require("./middlewares/errorMapper");
const errorHandler = require("./middlewares/errorHandler");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const { MONGODBFALLBACK } = require("./utils/constants");
const ingredientSync = require("./utils/ingredientSync");

const app = express();
const { PORT = 3001, MONGODB = MONGODBFALLBACK } = process.env;
const globalLimiter = rateLimit({ ...LIMITERCONFIG, max: 100 });

(async () => {
  try {
    await mongoose.connect(MONGODB);
    await ingredientSync();
  } catch (error) {
    console.error(error);
  }
})();

app.use(globalLimiter);
app.use(cors(CORSCONFIG));
app.use(helmet());
app.use(hpp());
app.use(express.json());
app.use(requestLogger);
app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(errorMapper);
app.use(errorHandler);
app.listen(PORT, () => {});
