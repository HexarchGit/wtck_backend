const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { CREATED } = require("../utils/responses");
const { NotFoundError } = require("../utils/errors");
const { JWTDEV } = require("../utils/constants");

const { JWT_SECRET = JWTDEV } = process.env;

module.exports.getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).orFail();
    res.send(user);
  } catch (error) {
    next(error);
  }
};

module.exports.createUser = async (req, res, next) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 10);
    const { name, avatar, email } = req.body;
    const user = await User.create({ name, avatar, email, password: hash });
    const newUser = user.toObject();
    delete newUser.password;
    res.status(CREATED).send(newUser);
  } catch (error) {
    next(error);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findUserByCredentials(email, password);
    const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
      expiresIn: "7d",
    });
    res.send({ token });
  } catch (error) {
    next(error);
  }
};

module.exports.updateUser = async (req, res, next) => {
  try {
    const { name, avatar } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, avatar },
      { new: true, runValidators: true }
    );
    if (!user) throw new NotFoundError();
    res.send(user);
  } catch (error) {
    next(error);
  }
};
