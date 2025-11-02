const Favorite = require("../models/favorite");
const Recipe = require("../models/recipe");
const { CREATED } = require("../utils/responses");

module.exports.getFavorites = async (req, res, next) => {
  try {
    const favorites = await Favorite.find({ user: req.user._id })
      .select("recipe")
      .populate("recipe");
    res.send(favorites);
  } catch (error) {
    next(error);
  }
};

module.exports.addFavorite = async (req, res, next) => {
  try {
    const meal = await Recipe.findOne({ mealId: req.body.mealId });
    const favorite = await (
      await Favorite.create({
        user: req.user._id,
        recipe: meal,
      })
    ).populate("recipe");
    res.status(CREATED).send(favorite);
  } catch (error) {
    next(error);
  }
};

module.exports.removeFavorite = async (req, res, next) => {
  try {
    const meal = await Recipe.findOne({ mealId: req.body.mealId });
    const favorite = await Favorite.findOneAndDelete({
      user: req.user._id,
      recipe: meal,
    })
      .select("recipe")
      .populate("recipe");
    res.send(favorite);
  } catch (error) {
    next(error);
  }
};
