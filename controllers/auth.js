const User = require("../models/user");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const signup = async (req, res) => {
  const user = await User.create({ ...req.body });
  console.log(user);
  // res.send(req);
  // const token = user.createJWT();
  // res.status(StatusCodes.CREATED).json({
  //   user: {
  //     name: user.name,
  //     username: user.username,
  //     userId: user._id,
  //     phoneNumber: user.phoneNumber,
  //     email: user.email,
  //     address: user.address,
  //     profession: user.profession,
  //   },
  //   token,
  // });

  // res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};

const login = async (req, res) => {
  const {
    $or: [email, phoneNumber],
    password,
  } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }

  const user = await User.findOne({ $or: [email, phoneNumber] }).collation({
    locale: "en",
    strength: 2,
  });

  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  const token = user.createJWT();

  res.json({
    user: { name: user.name, email: user.email, role: user.role },
    token,
  });
};

module.exports = {
  signup,
  login,
};
