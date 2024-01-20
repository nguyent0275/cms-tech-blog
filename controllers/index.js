const router = require("express").Router();
const apiRoutes = require("./api");
const homeroutes = require("./home-routes");

router.use("/", homeroutes);
router.use("/api", apiRoutes);

module.exports = router;
