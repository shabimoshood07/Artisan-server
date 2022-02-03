const User = require("../models/user");
const { StatusCodes } = require("http-status-codes");

const getAllArtisan = async (req, res) => {
  const artisan = await User.find({}).sort("_id");
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
