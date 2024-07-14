const { Router } = require("express");
const { update } = require("../controllers/update");

const router = Router();

router.post("/update", update);

module.exports = router;