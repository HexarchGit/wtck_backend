const { parseNameNormalizer } = require("./parseNameNormalizer");

module.exports.parseMealDbData = (meal) => {
  const mealingredients = Object.keys(meal)
    .filter((item) => item.startsWith("strIngredient") && meal[item])
    .map((item) => ({
      name: parseNameNormalizer(meal[item].trim()),
      measure:
        meal[item.replace("strIngredient", "strMeasure")]?.trim() || null,
    }));

  return {
    mealName: meal.strMeal,
    mealId: meal.idMeal,
    mealImage: meal.strMealThumb,
    mealCategory: meal.strCategory || null,
    mealArea: meal.strArea || null,
    mealInstructions: meal.strInstructions || null,
    mealingredients: mealingredients || null,
  };
};
