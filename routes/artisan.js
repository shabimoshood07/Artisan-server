const express = require("express");
const { getAllArtisan, getArtisan } = require("../controllers/artisan");
const router = express.Router();

router.get("/", getAllArtisan);
router.get("/:id", getArtisan);

module.exports = router;
