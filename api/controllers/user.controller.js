import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";

import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

// Test user
export const test = async (req, res) => {
  res.json({ message: "API running" });
};

// Sign out
export const signout = async (req, res, next) => {
  try {
    res.clearCookie("access_token").status(200).json("Logged out successfully");
  } catch (error) {
    next(error);
  }
};

// Update user
export const updateUserProfileData = async (req, res, next) => {
  // user from verifyToken (logged in user)
  // console.log(req.user);

  try {
    if (req.user.id !== req.params.userId)
      return next(errorHandler(403, "Not allowed to update this user."));

    // 'username' validation
    if (req.body.username) {
      if (req.body.username.length < 7 || req.body.username.length > 30)
        return next(errorHandler(400, "Username must be between 7-30 chars"));

      if (req.body.username.includes(" "))
        return next(errorHandler(400, "Username cannot contain spaces"));

      if (req.body.username !== req.body.username.toLowerCase())
        return next(errorHandler(400, "Username must be lowercase"));

      if (!req.body.username.match(/^[a-zA-Z0-9]+$/))
        return next(
          errorHandler(400, "Username only contains letters & numbers")
        );
    }

    // 'phone' validation
    if (req.body.phone) {
      if (req.body.phone.length !== 10)
        return next(errorHandler(400, "Phone no. must be 10 digits"));

      /*
        validation regex: 98(8-digits)
        -----------------
        e.g., 9845123456
        regex: [9][8][0-9]{8}
        */
      if (!req.body.phone.match(/^[9][8][0-9]{8}$/))
        return next(errorHandler(400, "Invalid phone no."));
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          username: req.body.username,
          phone: req.body.phone,
          address: req.body.address,
          dob: req.body.dob,
          gender: req.body.gender,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

// Update user password
export const updateUserPassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (req.user.id !== req.params.userId) {
      return next(errorHandler(403, "Not allowed to update this user."));
    } else {
      const user = await User.findOne(req.user.email);
      const decode_password = await bcryptjs.compareSync(
        oldPassword,
        user.password
      );
      if (!decode_password) {
        return next(errorHandler(401, "Invalid old password!"));
      } else {
        if (oldPassword === newPassword) {
          return next(
            errorHandler(
              400,
              "Old & new password matched! Please enter different."
            )
          );
        } else {
          const salt = await bcryptjs.genSaltSync(10);
          const hashedPassword = await bcryptjs.hashSync(newPassword, salt);

          const updatedUserPassword = await User.findByIdAndUpdate(
            req.params.userId,
            {
              $set: {
                password: hashedPassword,
              },
            },
            { new: true }
          );

          const { password, ...rest } = updatedUserPassword._doc;

          res.clearCookie("access_token").status(200).json({
            success: true,
            message: "Password updated, Please login again.",
          });
        }
      }
    }
  } catch (error) {
    next(error);
  }
};

// Update profile image
export const updateUserProfileImage = async (req, res, next) => {
  try {
    // using multer we upload image file
    const imageFile = req.file;

    if (req.user.id !== req.params.userId) {
      return next(errorHandler(403, "Not allowed to update this user."));
    } else {
      if (!imageFile) {
        return next(errorHandler(400, "Error on uploading image!"));
      } else {
        // upload image to cloudinary
        // 1. uploading to cloudinary from local system
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
          resource_type: "image",
        });
        // 2. storing link of that image from cloudinary into variable
        const imageURL = imageUpload.secure_url;

        // 3. update profile image into database
        // await User.findByIdAndUpdate(userId, { profilePicture: imageURL });
        const updatedUserProfileImage = await User.findByIdAndUpdate(
          req.params.userId,
          {
            $set: {
              profilePicture: imageURL,
            },
          },
          { new: true }
        );

        /* const token = jwt.sign(
          { id: req.params.userId },
          process.env.JWT_SECRET,
          {
            expiresIn: "7d",
          }
        ); */

        // Separate password
        // const { password: pass, ...rest } = validUser._doc;

        /* res
              .status(200)
              .cookie("access_token", token, {
                path: "/",
                httpOnly: true,
                expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7d, (days/1) * (hours/day) * (minutes/hour) * (seconds/minute) * (miliseconds/second)
                sameSite: "none",
                secure: true,
              })
              .json(rest); */

        const { password, ...rest } = updatedUserProfileImage._doc;

        res.status(200).json({
          success: true,
          message: "Profile image updated",
          rest,
        });
      }
    }
  } catch (error) {
    next(error);
  }
};
