const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  recipe: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "recipe",
  },
});
favoriteSchema.index({ user: 1, recipe: 1 }, { unique: true });

favoriteSchema.set("toJSON", {
  transform: (_doc, ret) => {
    const transformResult = ret.recipe;
    delete transformResult._id;
    delete transformResult.__v;
    return transformResult;
  },
});

module.exports = mongoose.model("favorite", favoriteSchema);
