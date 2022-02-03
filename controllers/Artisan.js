const User = require("../models/user");

const getAllArtisan = async (req, res) => {
  console.log("all artisan");
};
const getArtisan = async (req, res) => {
  console.log("one artisan");
};

module.exports = {
  getAllArtisan,
  getArtisan,
};
