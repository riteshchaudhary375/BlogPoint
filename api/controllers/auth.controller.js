import bcryptjs from "bcryptjs";
import validator from "validator";
import jwt from "jsonwebtoken";

import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password)
      return next(errorHandler(400, "All fields required!"));

    // Check existing user
    const exists = await User.findOne({ email });
    if (exists) return next(errorHandler(409, "User already exists!")); // the server responds with a 409 Conflict status code because a user with that ID already exists. The response includes a JSON error message indicating the cause of the conflict.

    // Validating email format
    if (!validator.isEmail(email))
      return next(errorHandler(422, "Invalid email address")); // A 422 status code indicates that the server was unable to process the request because it contains invalid data

    // Validating 8 chars password
    if (password.length < 8)
      return next(errorHandler(422, "Password must be 8 chars!"));

    // If everything ok
    // Hashing password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hashSync(password, salt);

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();

    res
      .status(201)
      .json({ success: true, message: "Account created, Please login." });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return next(errorHandler(400, "All fields required!"));

    // Matching user
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User not found!"));

    // Matching password
    const validPassword = await bcryptjs.compareSync(
      password,
      validUser.password
    );
    if (!validPassword) return next(errorHandler(400, "Invalid credentials!"));

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Separate password
    const { password: pass, ...rest } = validUser._doc;

    res
      .status(200)
      .cookie("access_token", token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7d, (days/1) * (hours/day) * (minutes/hour) * (seconds/minute) * (miliseconds/second)
        sameSite: "none",
        secure: true,
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  try {
    const { name, email, googlePhotoUrl } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password, ...rest } = user._doc;

      res
        .cookie("access_token", token, {
          path: "/",
          httpOnly: true,
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7d
          sameSite: "none",
          secure: true,
        })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);

      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, salt);

      const newUser = new User({
        username:
          name.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
      });

      await newUser.save();

      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);

      const { password, ...rest } = newUser._doc;

      res
        .cookie("access_token", token, {
          path: "/",
          httpOnly: true,
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7d
          sameSite: "none",
          secure: true,
        })
        .status(201)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};
