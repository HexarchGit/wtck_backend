const router = require("express").Router();
const { getMealDbData } = require("../../controllers/proxyDb");
router.use(getMealDbData);
module.exports = router;
