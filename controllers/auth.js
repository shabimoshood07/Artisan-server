const User = require("../models/user");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const signup = async (req, res) => {
  try {
    const user = await User.create({ ...req.body });
    const token = user.createJWT();
    res.status(StatusCodes.CREATED).json({
      user: {
        name: user.name,
        username: user.username,
        userId: user._id,
        phoneNumber: user.phoneNumber,
        email: user.email,
        address: user.address,
        profession: user.profession,
      },
      token,
    });
  } catch (error) {
    res.send(error);
  }

  // res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};

const login = async (req, res) => {
  // const { email, password, phoneNumber } = req.body;
  // const {({$or:[{email:email},{phoneNumber:phoneNumber}]}), password} = req.body

  let phoneNumber = req.body.phoneNumber;
  let email = req.body.email;
  // let username = req.body.username;
  let password = req.body.password;

  // const {
  //   $or: [{ email: email }, { phoneNumber: phoneNumber }],
  //   password,
  // } = req.body;

  // if (!email || !password) {
  //   throw new BadRequestError(
  //     "Please provide email or phone number and password"
  //   );
  // }
  if (!email) {
    if (!phoneNumber) {
      throw new BadRequestError(
        "Please provide email or phone number and password"
      );
    }
  }
  if (!password) {
    throw new BadRequestError("Please provide password");
  }

  const user = await User.findOne({
    $or: [{ email: email }, { phoneNumber: phoneNumber }],
  }).collation({
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
    user: { name: user.name, email: user.email, profession: user.profession },
    token,
  });
};

module.exports = {
  signup,
  login,
};
