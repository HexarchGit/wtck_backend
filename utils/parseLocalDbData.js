const Ingredient = require("../models/ingredient");

module.exports.parseLocalDbData = async (meal) => {
  const rawIngredients = meal.mealingredients;
  const dbIngredients = await Ingredient.find({
    name: { $in: rawIngredients.map((ingredient) => ingredient.name) },
  })
    .select("name")
    .lean();

  const map = new Map(
    dbIngredients.map((ingredient) => [ingredient.name, ingredient._id])
  );

  const parsedIngredients = rawIngredients.map((item) => ({
    ingredient: map.get(item.name),
    measure: item.measure,
  }));

  return {
    ...meal,
    mealingredients: parsedIngredients,
  };
};
