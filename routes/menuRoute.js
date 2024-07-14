const { Router } = require("express");
const { menu } = require("../controllers/menu");

const router = Router();

router.get("/restaurant/:resId", menu);

module.exports = router;