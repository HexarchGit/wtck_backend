const router = require("express").Router();
const {
  getCurrentUser,
  updateUser,
  addFavorite,
  removeFavorite,
} = require("../../controllers/users");
const auth = require("../../middlewares/auth");
const {
  validateUpdateUser,
  validateAddFavorite,
  validateRemoveFavorite,
} = require("../../middlewares/validation");

router.get("/me", auth, getCurrentUser);
router.patch("/me", auth, validateUpdateUser, updateUser);
router.put("/favorites", auth, validateAddFavorite, addFavorite);
router.delete("/favorites", auth, validateRemoveFavorite, removeFavorite);

module.exports = router;
