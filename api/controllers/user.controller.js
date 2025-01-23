import bcryptjs from "bcryptjs";
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

// Update password
export const updatePassword = async (req, res, next) => {
  /* console.log("Token user: ", req.user);
  console.log("Body req user: ", req.params.userId); */

  try {
    const { oldPassword, newPassword } = req.body;

    if (req.user.id !== req.params.userId) {
      return next(errorHandler(403, "Not allowed to update this user."));
    }

    const verifiedUser = await User.findById(req.params.userId);

    const compareOldPass = await bcryptjs.compareSync(
      oldPassword,
      verifiedUser.password
    );

    if (!compareOldPass)
      return next(errorHandler(401, "Invalid old password!"));

    if (oldPassword === newPassword)
      return next(
        errorHandler(400, "Old & new password matched! Please enter new.")
      );

    const salt = await bcryptjs.genSaltSync(10);
    const hashedPassword = await bcryptjs.hashSync(newPassword, salt);

    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          password: hashedPassword,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;

    res.clearCookie("access_token").status(200).json({
      success: true,
      message: "Password updated, Please login again.",
    });
  } catch (error) {
    next(error);
  }
};

// Update profile image
export const updateUserProfileImage = async (req, res, next) => {
  try {
    // using multer we upload image file
    const imageFile = req.file;
    // console.log(imageFile);

    if (req.user.id !== req.params.userId) {
      return next(errorHandler(403, "Not allowed to update this user."));
    }
    // else {
    // console.log("user matched");
    // }
    // else {

    if (!imageFile) {
      return next(errorHandler(400, "Error on uploading image!"));
    }

    if (imageFile) {
      // upload image to cloudinary
      // 1. uploading to cloudinary from local system
      const imageUpload = await cloudinary.uploader.upload(
        imageFile.path,
        {
          // upload_preset:'unsigned_upload',
          allowed_formats: ["png", "jpg", "jpeg", "svg", "ico", "jfif", "webp"],
          // public_id:"avatar",
          resource_type: "image",
        },
        function (error, result) {
          if (error) {
            next(errorHandler(error.message));
            // console.log(error);
            return;
          }
          // console.log(result);
        }
      );
      // 2. storing link of that image from cloudinary into variable
      const imageURL = imageUpload.secure_url;

      // 3. update profile image into database
      /* const updatedUserProfileImage = await User.findByIdAndUpdate(
        req.params.userId,
        { profilePicture: imageURL }
      ); */
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

      const { password, ...rest } = await updatedUserProfileImage._doc;

      await res.status(200).json({
        success: true,
        message: "Profile image updated",
        rest,
      });
    }
    // }
  } catch (error) {
    next(error);
  }
};

// Get users list for Admin dashboard
export const getUsers = async (req, res, next) => {
  const validUser = await User.findById(req.user.id);
  if (!validUser.isAdmin)
    return next(errorHandler(403, "You are not allowed to see all users!"));

  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.sort === "asc" ? 1 : -1;

    const users = await User.find()
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const userWithoutPassword = users.map((user) => {
      const { password, ...rest } = user._doc;
      return rest;
    });
    // console.log(userWithoutPassword);

    const totalUsers = await User.countDocuments();
    // console.log(totalUsers);

    // For total-creator and total-normal-user
    const totalCreator = await User.find({
      isCreator: "true" || true,
    }).countDocuments();
    // console.log(totalCreator);

    const totalAdmin = await User.find({
      isAdmin: "true" || true,
    }).countDocuments();
    // console.log(totalCreator);

    const totalNormalUser = totalUsers - (totalCreator + totalAdmin);
    // console.log(totalNormalUser);

    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthUsers = await User.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      users: userWithoutPassword,
      totalUsers,
      lastMonthUsers,
      totalNormalUser,
      totalCreator,
      totalAdmin,
    });
  } catch (error) {
    next(error);
  }
};

// Get all users list
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    // console.log(users);

    const userWithoutPassword = users.map((user) => {
      const { password, ...rest } = user._doc;
      return rest;
    });

    res.status(200).json({
      success: true,
      users: userWithoutPassword,
    });
  } catch (error) {
    next(error);
  }
};

// Delete users by admin in admin dashboard
export const deleteUser = async (req, res, next) => {
  try {
    const validAdmin = await User.findById(req.user.id);
    if (!validAdmin.isAdmin)
      return next(errorHandler(403, "You are not allowed to delete users!"));

    await User.findByIdAndDelete(req.params.userId);

    res.status(200).json({ message: "User deleted!" });
  } catch (error) {
    next(error);
  }
};

// Post user role
export const updateUserRole = async (req, res, next) => {
  if (req.user.id !== req.params.adminId)
    return next(errorHandler(403, "You are not allowed to update user role!"));

  let updatedUser;
  if (req.body.role === "User") {
    updatedUser = await User.findByIdAndUpdate(
      req.params.roleUserId,
      {
        $set: {
          role: req.body.role,
          // isCreator: !isCreator,
          isCreator: false,
        },
      },
      { new: true }
    );
  }
  if (req.body.role === "Creator") {
    updatedUser = await User.findByIdAndUpdate(
      req.params.roleUserId,
      {
        $set: {
          role: req.body.role,
          // isCreator: !isCreator,
          isCreator: true,
        },
      },
      { new: true }
    );
  }

  const { password, ...rest } = updatedUser._doc;

  res.status(200).json({ user: rest, message: "Role updated" });
  try {
  } catch (error) {
    next(error);
  }
};
