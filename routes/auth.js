const express = require("express");
const { signup, login } = require("../controllers/auth");
const upload = require("../multer");
const profileImage = require("../cloudinary");
const router = express.Router();

router.post("/signup", upload.single("profileImage"), profileImage, signup);
router.post("/login", login);

module.exports = router;
