const mongoose = require("mongoose");

const ingredientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  externalId: {
    type: String,
    unique: true,
    select: false,
  },
});

ingredientSchema.set("toJSON", {
  transform: (_doc, ret) => {
    const transformResult = ret;
    delete transformResult._id;
    delete transformResult.__v;
    return transformResult;
  },
});

module.exports = mongoose.model("ingredient", ingredientSchema);
