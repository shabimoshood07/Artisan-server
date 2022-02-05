const User = require("../models/user");
const { StatusCodes } = require("http-status-codes");

const getAllArtisan = async (req, res) => {
  const { profession, address, sort } = req.query;
  const queryObject = {};
  if (profession) {
    queryObject.profession = profession;
  }
  if (address) {
    queryObject.address = address;
  }
  const artisan = await User.find({}).sort("_id").select("profession details");
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
