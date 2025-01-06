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
export const updateUserProfile = async (req, res, next) => {
  // user from verifyToken (logged in user)
  // console.log(req.user);

  try {
    // const { address } = req.body;

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
      if (!req.body.phone.match(/^[9][8][0-9]{8}/))
        return next(errorHandler(400, "Phone no. not valid"));
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          username: req.body.username,
          phone: req.body.phone,
          // address: JSON.parse(address),
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
