const RegUser = require("../models/regUser");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const signup = async (req, res) => {
  const regUser = await RegUser.create({
    ...req.body,
  });
  const token = regUser.createJWT();
  res.status(StatusCodes.CREATED).json({ regUser: { regUser }, token });
};
const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new BadRequestError("please provide username and password");
  }
  const regUser = RegUser.findOne(username).collation({
    locale: "en",
    strength: 2,
  });

  if (!regUser) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  const isPasswordCorrect = await regUser.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  const token = user.createJWT();

  res.json({
    regUser,
    token,
  });
};
module.exports = {
  signup,
  login,
};
