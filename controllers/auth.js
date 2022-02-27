const User = require("../models/user");
const RegUser = require("../models/regUser");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const signup = async (req, res) => {
  const user = await User.create({
    ...req.body,
    profileImage: path,
  });
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({ user: { user }, token });
};

const login = async (req, res) => {
  const { data, password } = req.body;
  if (!data) {
    throw new BadRequestError(
      "Please provide email or phone number or username and password"
    );
  }
  const user = await RegUser.findOne({ username: data }).collation({
    locale: "en",
    strength: 2,
  });

  if (!user) {
    // FIND ARTISAN BY EMAIL
    const user = await User.findOne({ email: data }).collation({
      locale: "en",
      strength: 2,
    });

    if (!user) {
      // FIND ARTISAN BY PHONE NUMBER
      const user = await User.findOne({
        phoneNumber: data,
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
        user,
        token,
      });
    }

    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) {
      throw new UnauthenticatedError("Invalid Credentials");
    }
    const token = user.createJWT();

    res.json({
      user,
      token,
    });
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  const token = user.createJWT();

  res.json({
    user,
    token,
  });
};

// const login = async (req, res) => {
//   let phoneNumber = req.body.PhoneNumber;
//   let email = req.body.email;
//   let password = req.body.password;
//   let username = req.body.username;

//   if (!email) {
//     if (!phoneNumber) {
//       if (!username) {
//         throw new BadRequestError(
//           "Please provide email or phone number or username and password"
//         );
//       } else {
//         const user = await RegUser.findOne({ username }).collation({
//           locale: "en",
//           strength: 2,
//         });

//         if (!user) {
//           throw new UnauthenticatedError("Invalid Credentials");
//         }
//         const isPasswordCorrect = await user.comparePassword(password);

//         if (!isPasswordCorrect) {
//           throw new UnauthenticatedError("Invalid Credentials");
//         }
//         const token = user.createJWT();

//         res.json({
//           user,
//           token,
//         });
//       }

//       // throw new BadRequestError(
//       //   "Please provide email or phone number and password"
//       // );
//     }
//   }
//   if (!password) {
//     throw new BadRequestError("Please provide password");
//   }

//   const user = await User.findOne({
//     $or: [
//       { email: email },
//       { workPhoneNumber: phoneNumber },
//     ],
//   }).collation({
//     locale: "en",
//     strength: 2,
//   });

//   if (!user) {
//     throw new UnauthenticatedError("Invalid Credentials");
//   }

//   const isPasswordCorrect = await user.comparePassword(password);

//   if (!isPasswordCorrect) {
//     throw new UnauthenticatedError("Invalid Credentials");
//   }

//   const token = user.createJWT();

//   res.json({
//     user: { name: user.name, email: user.email, profession: user.profession },
//     token,
//   });
// };

module.exports = {
  signup,
  login,
};

// } catch (error) {
//   res.send(error);
// }

// res.status(StatusCodes.CREATED).json({
//   user: {
//     name: user.name,
//     username: user.username,
//     userId: user._id,
//     phoneNumberWork: user.phoneNumber.work[0],
//     phoneNumberHome: user.phoneNumber.home[0],
//     email: user.email,
//     address: user.address,
//     profession: user.profession,
//     about: user.details.about,
//     age: user.details.age,
//     profileImage: user.profileImage,
//     facebookUrl: user.socials.facebook,
//   },
//   token,
// });

// res.status(StatusCodes.CREATED).json({
//   user: {
//     name: user.name,
//     username: user.username,
//     userId: user._id,
//     phoneNumberWork: user.phoneNumber.work[0],
//     phoneNumberHome: user.phoneNumber.home[0],
//     email: user.email,
//     address: user.address,
//     profession: user.profession,
//     about: user.details.about,
//     age: user.details.age,
//     profileImage: user.profileImage,
//   },
//   token,
// });
// res.status(StatusCodes.CREATED).json({ user, token });

// } catch (error) {
//   res.send(error);
// }
// res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
