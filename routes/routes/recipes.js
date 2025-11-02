const router = require("express").Router();
const { getMealData } = require("../../controllers/recipes");

router.use(getMealData);

module.exports = router;
