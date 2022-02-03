const express = require("express");
const { getAllArtisan } = require("../controllers/artisan");
const router = express.Router();

router.get("/artisan", getAllArtisan);

module.exports = router;
