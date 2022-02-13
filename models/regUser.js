const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
var uniqueValidator = require("mongoose-unique-validator");
var mongooseTypePhone = require("mongoose-type-phone");

const regUserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: [true, "Please provide username"],
    unique: true,
    maxlength: 50,
    minlength: 3,
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 6,
  },
});

// create JWT
regUserSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, username: this.username },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );
};

// hash password
regUserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// compare password
regUserSchema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model("RegUser", regUserSchema);
