const User = require("../models/user");
const { StatusCodes } = require("http-status-codes");
const {
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
} = require("../errors");
const getAllArtisan = async (req, res) => {
  const { profession, address, sort } = req.query;
  const queryObject = {};
  if (profession) {
    queryObject.profession = { $regex: profession, $options: "i" };
  }
  if (address) {
    queryObject.address = { $regex: address, $options: "i" };
  }
  let result = User.find(queryObject).collation({
    locale: "en",
    strength: 2,
  });

  const artisan = await result
    .sort("profession")
    .select(
      "profession details phoneNumber.work phoneNumber.home email address username profileImage"
    );
  res.status(StatusCodes.OK).json({ artisan });
};

const getArtisan = async (req, res) => {
  const { id } = req.params;
  const artisan = await User.findById({ _id: id });
  if (!artisan) {
    throw new NotFoundError("Artisan not found");
  }
  res.status(StatusCodes.OK).json({ artisan });
};

module.exports = {
  getAllArtisan,
  getArtisan,
};
