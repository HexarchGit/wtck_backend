const mongoose = require("mongoose");
const validator = require("validator");
const { MEALCATEGORIES, MEALAREAS } = require("../utils/configs");

const recipeSchema = new mongoose.Schema({
  mealName: {
    type: String,
    required: true,
    minlength: 2,
  },
  mealId: {
    type: String,
    required: true,
    unique: true,
  },
  mealImage: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "You must enter a valid URL",
    },
  },
  mealCategory: {
    type: String,
    validate: {
      validator(value) {
        return MEALCATEGORIES.includes(value);
      },
      message: (props) => `${props.value} is not a valid category`,
    },
  },
  mealArea: {
    type: String,
    validate: {
      validator(value) {
        return MEALAREAS.includes(value);
      },
      message: (props) => `${props.value} is not a valid area`,
    },
  },
  mealingredients: [
    {
      ingredient: { type: mongoose.Schema.Types.ObjectId, ref: "ingredient" },
      measure: { type: String },
    },
  ],
  mealInstructions: { type: String, required: true },
});

recipeSchema.set("toJSON", {
  transform: (_doc, ret) => {
    const transformResult = ret;
    if (Array.isArray(transformResult.mealingredients)) {
      transformResult.mealingredients = transformResult.mealingredients.map(
        (ingredientObject) => ({
          ...ingredientObject,
          name:
            ingredientObject.ingredient?.name || ingredientObject.ingredient,
        })
      );
    }
    delete transformResult._id;
    delete transformResult.__v;
    return transformResult;
  },
});

module.exports = mongoose.model("recipe", recipeSchema);
