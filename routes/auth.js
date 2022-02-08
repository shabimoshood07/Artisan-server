const express = require("express");
const { signup, login, upload } = require("../controllers/auth");
const router = express.Router();

router.post("/signup", upload.single("profileImage"), signup);
router.post("/login", login);

module.exports = router;
