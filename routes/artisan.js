const express = require("express");
const { getAllArtisan, getArtisan } = require("../controllers/artisan");
const router = express.Router();

router.get("/artisan", getAllArtisan);
router.get("/artisan/:id", getArtisan);

module.exports = router;
