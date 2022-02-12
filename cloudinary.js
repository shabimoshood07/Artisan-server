const cloudinary = require("cloudinary");
const dotenv = require("dotenv");
const fs = require("fs");

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const profileImage = async (req, res, next) => {
  if (req.file) {
    const result = await cloudinary.uploader.upload(req.file.path, {
      use_filename: true,
      folder: "profileImage",
    });
    fs.unlinkSync(req.file.path);
    path = result.secure_url;
    next();
  } else {
    path =
      "https://res.cloudinary.com/xabi007/image/upload/v1644484061/profileImage/avatar-g2b4feb965_1280_qbyhur.png";
    next();
  }
};

module.exports = profileImage;

// exports.uploads = (file, folder) => {
//   return new Promise((resolve) => {
//     cloudinary.uploader.upload(
//       file,
//       (result) => {
//         resolve({
//           url: result.url,
//           id: result.public_id,
//         });
//       },
//       {
//         resource_type: "auto",
//         folder: folder,
//       }
//     );
//   });
// };

// let files = req.file;
//   console.log(files);
//   if (files) {
//     const uploader = async (path) =>
//       await cloudinary.uploads(path, "profileImage");
//     let newPath = await uploader(req.file.path);
//     fs.unlinkSync(req.file.path);

//   } else {
//           const newPath =
//              "https://res.cloudinary.com/xabi007/image/upload/v1644484061/profileImage/avatar-g2b4feb965_1280_qbyhur.png",

//      }
