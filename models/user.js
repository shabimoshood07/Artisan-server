const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongooseIntlPhoneNumber = require("mongoose-intl-phone-number");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
    maxlength: 50,
    minlength: 3,
  },
  username: {
    type: String,
    required: [true, "Please provide name"],
    unique: [true, "User already exists"],
    maxlength: 50,
    minlength: 3,
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
    unique: [true, "User already exists"],
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 6,
  },
  address: {
    type: String,
    required: [true, "Please provide address"],
  },
  phoneNumber: {
    type: String,
    required: [true, "Please provide phone number"],
  },
  Profession: {
    type: String,
    required: [true, "Please provide profession"],
  },
});

// hash password
UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// create JWT
UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, name: this.name, Profession: this.Profession },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );
};

// compare password
UserSchema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password);
  return isMatch;
};

UserSchema.plugin(mongooseIntlPhoneNumber, {
  hook: "validate",
  internationalFormat: "internationalFormat",
  phoneNumberField: "phoneNumber",
  nationalFormatField: "nationalFormat",
  countryCodeField: "countryCode",
});

module.exports = mongoose.model("User", UserSchema);
