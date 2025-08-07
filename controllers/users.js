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

module.exports.addFavorite = async (req, res, next) => {
  try {
    const { mealName, imageUrl, mealId } = req.body;
    const user = await User.findById(req.user._id).orFail();
    const isThere = user.favorites.some((item) => item.mealId === mealId);
    if (!isThere) {
      user.favorites.push({ mealName, imageUrl, mealId });
      await user.save();
    }
    res.send(user.favorites);
  } catch (error) {
    next(error);
  }
};
module.exports.removeFavorite = async (req, res, next) => {
  try {
    const { mealId } = req.body;
    const user = await User.findById(req.user._id).orFail();
    user.favorites = user.favorites.filter((item) => item.mealId !== mealId);
    await user.save();
    res.send(user.favorites);
  } catch (error) {
    next(error);
  }
};
