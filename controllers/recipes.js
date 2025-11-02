const NodeCash = require("node-cache");
const { ServerError } = require("../utils/errors");
const Recipe = require("../models/recipe");
const Ingredient = require("../models/ingredient");
const { parseMealDbData } = require("../utils/parseMealDbData");
const { parseLocalDbData } = require("../utils/parseLocalDbData");
const { cacheAndSend } = require("../utils/cacheAndSend");

const cache = new NodeCash({ stdTTL: 60 * 10 });
const proxyApiUrl = "http://www.themealdb.com/api/json/v1";
const proxyApiKey = "1";
const proxyBaseUrl = `${proxyApiUrl}/${proxyApiKey}`;

const getMealDbData = async (url) => {
  const apiUrl = `${proxyBaseUrl}${url}`;
  const responseApi = await fetch(apiUrl);
  if (!responseApi.ok)
    throw new ServerError(
      `Request through proxy failed with code ${responseApi.status}`
    );
  return responseApi.json();
};

const getingredients = async (req, res, next) => {
  try {
    const ingredients = await Ingredient.distinct("name");
    cacheAndSend(res, cache, req.url, ingredients);
  } catch (error) {
    next(error);
  }
};

const getMealsByingredient = async (req, res, next) => {
  try {
    const ingredientName = req.url
      .replace("/filter.php?i=", "")
      .replace("%20", " ");
    const mealMap = new Map();
    const ingredientDb = await Ingredient.findOne({ name: ingredientName });
    const localRecipes = await Recipe.find({
      "mealingredients.ingredient": ingredientDb._id,
    })
      .select("mealName mealImage mealId")
      .lean();
    localRecipes.forEach((meal) => mealMap.set(meal.mealId, meal));
    const apiRecipes = (await getMealDbData(req.url)).meals;
    const parsedApiRecipes = apiRecipes.map(parseMealDbData);
    parsedApiRecipes.forEach((meal) => {
      if (!mealMap.has(meal.mealId)) mealMap.set(meal.mealId, meal);
    });
    const recipes = Array.from(mealMap.values());
    cacheAndSend(res, cache, req.url, recipes);
  } catch (error) {
    next(error);
  }
};

const getMealById = async (req, res, next) => {
  try {
    const mealId = req.url.replace("/lookup.php?i=", "");
    const localResult = await Recipe.findOne({ mealId }).populate(
      "mealingredients.ingredient"
    );
    if (localResult) {
      cacheAndSend(res, cache, req.url, localResult);
    } else {
      const apiRecipe = (await getMealDbData(req.url)).meals[0];
      const parsedApiMeal = parseMealDbData(apiRecipe);
      const parsedLocalMeal = await parseLocalDbData(parsedApiMeal);
      await Recipe.create(parsedLocalMeal);
      cacheAndSend(res, cache, req.url, parsedApiMeal);
    }
  } catch (error) {
    next(error);
  }
};

const getRandomMeal = async (req, res, next) => {
  try {
    const apiRecipe = (await getMealDbData(req.url)).meals[0];
    await cacheAndSend(res, cache, req.url, [parseMealDbData(apiRecipe)]);
  } catch (error) {
    next(error);
  }
};

const handlerMap = {
  list: getingredients,
  filter: getMealsByingredient,
  lookup: getMealById,
  random: getRandomMeal,
};

module.exports.getMealData = (req, res, next) => {
  try {
    const match = req.url.match(/\/([A-Za-z0-9_-]+)\./);
    const operation = match ? match[1] : null;
    const handler = handlerMap[operation];
    if (!handler) {
      next();
      return;
    }
    handler(req, res, next);
  } catch (error) {
    next(error);
  }
};
