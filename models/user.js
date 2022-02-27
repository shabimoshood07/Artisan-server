const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
var uniqueValidator = require("mongoose-unique-validator");
var mongooseTypePhone = require("mongoose-type-phone");

// const detailsSchema = new mongoose.Schema({

// });

const UserSchema = new mongoose.Schema(
  {
    phoneNumber: {
      unique: true,
      type: mongoose.SchemaTypes.Phone,
      required: "Please provide phone number",
      allowBlank: false,
      allowedNumberTypes: [
        mongooseTypePhone.PhoneNumberType.MOBILE,
        mongooseTypePhone.PhoneNumberType.FIXED_LINE_OR_MOBILE,
      ],
      phoneNumberFormat: mongooseTypePhone.PhoneNumberFormat.INTERNATIONAL,
      defaultRegion: "NG",
      parseOnGet: false,
    },
    name: {
      type: String,
      required: [true, "Please provide name"],
      maxlength: 50,
      minlength: 3,
    },
    role: {
      type: String,
      default: "Artisan",
      required: true,
    },
    username: {
      type: String,
      required: [true, "Please provide company name or username"],
      unique: true,
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
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide password"],
      minlength: [6, "Password should be at least six characters"],
    },
    address: {
      type: String,
      required: [true, "Please provide address"],
    },

    profession: {
      type: String,
      required: [true, "Please provide profession"],
    },
    gender: {
      type: String,
      required: [true, "Please select  gender"],
      enum: ["male", "female"],
    },
    socials: {
      facebook: {
        type: String,
        default: "#",
      },
      instagram: {
        type: String,
        default: "#",
      },
      twitter: {
        type: String,
        default: "#",
      },
    },
    about: {
      type: String,
      maxlength: 5000,
      default: "",
    },
    profileImage: {
      type: String,
    },
  },

  { timestamps: true }
);

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

// Unique Validator
UserSchema.plugin(uniqueValidator, {
  message: "{PATH} already exist",
});

module.exports = mongoose.model("User", UserSchema);
