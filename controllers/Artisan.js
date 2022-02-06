const User = require("../models/user");
const { StatusCodes } = require("http-status-codes");

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
      "profession details phoneNumber.work phoneNumber.home email address username"
    );
  res
    .status(StatusCodes.OK)
    .json({ artisan: { artisan }, count: artisan.length });
};

const getArtisan = async (req, res) => {
  console.log("one artisan");
};

module.exports = {
  getAllArtisan,
  getArtisan,
};
