const { Router } = require("express");
const { restaurant } = require("../controllers/restaurant");

const router = Router();

router.get("/restaurant", restaurant);

module.exports = router;