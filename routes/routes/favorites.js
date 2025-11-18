const router = require("express").Router();
const {
  getFavorites,
  addFavorite,
  removeFavorite,
} = require("../../controllers/favorites");
const auth = require("../../middlewares/auth");
const {
  validateAddFavorite,
  validateRemoveFavorite,
} = require("../../middlewares/validation");

router.get("/", auth, getFavorites);
router.post("/", auth, validateAddFavorite, addFavorite);
router.delete("/", auth, validateRemoveFavorite, removeFavorite);
module.exports = router;
