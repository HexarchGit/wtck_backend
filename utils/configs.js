const { CORS_ORIGIN = "http://localhost:3000" } = process.env;

const LIMITERCONFIG = {
  windowMs: 15 * 60 * 1000,
  message: "Too many requests, try again later.",
};

const CORSCONFIG = {
  origin: CORS_ORIGIN,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: ["Authorization", "Content-Type"],
};

const MEALCATEGORIES = [
  "Beef",
  "Breakfast",
  "Chicken",
  "Dessert",
  "Goat",
  "Lamb",
  "Miscellaneous",
  "Pasta",
  "Pork",
  "Seafood",
  "Side",
  "Starter",
  "Vegan",
  "Vegetarian",
];

const MEALAREAS = [
  "American",
  "British",
  "Canadian",
  "Chinese",
  "Croatian",
  "Dutch",
  "Egyptian",
  "Filipino",
  "French",
  "Greek",
  "Indian",
  "Irish",
  "Italian",
  "Jamaican",
  "Japanese",
  "Kenyan",
  "Malaysian",
  "Mexican",
  "Moroccan",
  "Polish",
  "Portuguese",
  "Russian",
  "Spanish",
  "Thai",
  "Tunisian",
  "Turkish",
  "Ukrainian",
  "Unknown",
  "Uruguayan",
  "Vietnamese",
];

module.exports = { LIMITERCONFIG, CORSCONFIG, MEALCATEGORIES, MEALAREAS };
