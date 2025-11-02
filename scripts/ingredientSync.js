require("dotenv").config();
const mongoose = require("mongoose");
const Ingredient = require("../models/ingredient");

const { MONGODB } = process.env;
const proxyApiUrl = "http://www.themealdb.com/api/json/v1";
const proxyApiKey = "1";
const proxyApiReq = "list.php?i=list";
const proxyBaseUrl = `${proxyApiUrl}/${proxyApiKey}/${proxyApiReq}`;

async function ingredientSync() {
  try {
    await mongoose.connect(MONGODB);
    const response = await fetch(proxyBaseUrl);
    if (!response.ok) {
      throw new Error(`API returned: ${response.status}`);
    }
    const data = await response.json();
    const ingredients = data.meals;
    const bulkOps = ingredients.map((ingredient) => ({
      updateOne: {
        filter: { externalId: ingredient.idIngredient },
        update: {
          $set: {
            name: ingredient.strIngredient,
          },
        },
        upsert: true,
      },
    }));
    await Ingredient.bulkWrite(bulkOps);
  } catch (error) {
    console.error("Sync error:", error);
  } finally {
    await mongoose.disconnect();
  }
}

ingredientSync();
