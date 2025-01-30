import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import validator from "validator";
import jwt from "jsonwebtoken";
import { text } from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

import sendEmail from "../utils/sendEmail.js";
import { errorHandler } from "../utils/error.js";
import nodemailerTransporter from "../utils/nodemailerTransporter.js";

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

// Forgot password
export const forgotPassword = async (req, res, next) => {
  if (!req.body.email) return next(errorHandler(400, "Email required!"));

  // const { email } = req.body;

  try {
    // const existUser = await User.findOne(email); // error bcz findOne takes only one
    const existUser = await User.findOne(req.body); // error bcz findOne takes only one
    // console.log(existUser);

    if (!existUser) return next(errorHandler(404, "User not found!"));

    // Generate new token for user forgotten password
    const newToken = jwt.sign({ id: existUser._id }, process.env.JWT_SECRET, {
      // expiresIn: "1d",
      expiresIn: "180s", // 3mins
    });
    // console.log("newToken", newToken);

    // setting new token for user forgotten password
    const setUserToken = await User.findByIdAndUpdate(
      { _id: existUser._id },
      { verifyToken: newToken },
      { new: true }
    );
    // console.log("setUserToken", setUserToken);

    if (setUserToken) {
      // Construct new-password page url
      const newPasswordUrl = `${process.env.FRONTEND_URL}/reset-password/${existUser._id}/${setUserToken.verifyToken}`;
      // console.log("newPasswordUrl: ", newPasswordUrl);

      // Send email
      const sent_from = process.env.EMAIL_USER;
      const send_to = existUser.email;
      const reply_to = process.env.EMAIL_NO_REPLY;
      const subject = "BLOGPOINT. Reset Password";
      const template = "forgotPasswordEmailTemplate";
      const name = existUser.username;
      const link = newPasswordUrl;

      // Send email
      await sendEmail(
        sent_from,
        send_to,
        reply_to,
        subject,
        template,
        name,
        link
      );

      await res.status(200).json({
        success: true,
        message: "Reset password link sent to your email.",
      });
    }
  } catch (error) {
    next(error);
  }
};

// Reset password for verified user and check token is expired or not
export const resetPassword = async (req, res, next) => {
  const { id, token } = req.params;

  try {
    const validUser = await User.findOne({ _id: id, verifyToken: token });
    // console.log("validUser", validUser);

    // Validation for token verify
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("verifyToken", verifyToken);

    if (validUser && verifyToken) {
      res.status(200).json({ success: true, validUser });
    } else {
      return res
        .status(401)
        .json({ success: false, message: "User not found" });
    }
  } catch (error) {
    next(error);
  }
};

// Email config
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  service: "gmail",
  port: "587",
  // secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  // for some security checks like 'https'
  // for setting rejects or unauthorized to false
  // prevent not to make any issue for sending email
  tls: {
    rejectUnauthorized: false,
  },
});

// New password
export const newPassword = async (req, res, next) => {
  const { id, token } = req.params;
  const { password } = req.body;

  try {
    const validUser = await User.findOne({ _id: id, verifyToken: token });
    // console.log(validUser);

    // validate for token verify
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);

    if (validUser && verifyToken) {
      const salt = bcryptjs.genSaltSync(10);
      const newHashedPassword = bcryptjs.hashSync(password, salt);

      // set new password
      const setUserNewPassword = await User.findByIdAndUpdate(
        { _id: id },
        // { password: newHashedPassword }
        {
          $set: {
            password: newHashedPassword,
            verifyToken: null,
          },
        }
      );

      await setUserNewPassword.save();

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: validUser.email,
        replyTo: process.env.EMAIL_NO_REPLY,
        subject: "BLOGPOINT. Password Changed",
        // text: `Now you can login your account from given link:- http://localhost:5173/sign-in`,
        html: `
          <!DOCTYPE html>
            <html lang="en">
              <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Email Template</title>
              </head>
              <body
                style="background-color: grey; font-family: 'Poppins', Arial, sans-serif"
              >
                <table
                  align="center"
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  width="550"
                  bgcolor="white"
                  style="border: 2px solid black"
                >
                  <tbody>
                    <!-- HEADER -->
                    <tr>
                      <td
                        align="center"
                        style="
                          background-color: #4cb96b;
                          color: #ffffff;
                          height: 50px;
                          line-height: 25px;
                          letter-spacing: 0.7px;
                        "
                      >
                        <p style="margin-bottom: 0px">
                          <a
                            href="#"
                            target="_blank"
                            style="
                              font-size: 23px;
                              font-weight: bold;
                              color: #ffffff;
                              text-decoration: none;
                            "
                            >BLOGPOINT.</a
                          >
                        </p>
                        <p style="font-size: 14px; font-weight: semibold; margin-top: 0px">
                          Password Changed
                        </p>
                      </td>
                    </tr>

                    <!-- BODY -->
                    <tr>
                      <td>
                        <table style="padding: 25px 20px; font-size: 15px">
                          <tr>
                            <td>
                              <tr>
                                <td style="line-height: 25px; letter-spacing: 0.7px">
                                  <p>
                                    Hi
                                    <span style="font-weight: bold; font-size: 18px"
                                      >${validUser.username}</span
                                    >,
                                  </p>
                                  <p>Password changed successfull.</p>
                                  <p>
                                    Your account password has been changed. You can login
                                    your account by clicking below button.
                                  </p>
                                  <a
                                    href="${process.env.FRONTEND_URL}/sign-in"
                                    target="_blank"
                                    style="
                                      font-weight: bold;
                                      text-decoration: none;
                                      padding: 7px 15px;
                                      border-radius: 3px;
                                      background-color: #4cb96b;
                                      color: #ffffff;
                                    "
                                    >Login</a
                                  >
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <p
                                    style="
                                      margin-bottom: 0px;
                                      margin-top: 25px;
                                      color: black;
                                    "
                                  >
                                    Or copy and paste the URL into your browser:
                                  </p>
                                  <p
                                    style="
                                      margin-top: 5px;
                                      background-color: rgba(0, 0, 0, 0.07);
                                      padding: 5px 9px 5px 9px;
                                      border-radius: 7px;
                                      width: fit-content;
                                    "
                                  >
                                    <a
                                      href="#"
                                      target="_blank"
                                      style="color: #0400ed; font-size: 12px"
                                    >
                                      http://localhost:5173/sign-in
                                    </a>
                                  </p>
                                </td>
                              </tr>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    <!-- FOOTER -->
                    <tr>
                      <td
                        align="center"
                        style="
                          background-color: #333333;
                          color: #ffffff;
                          font-size: 13px;
                          height: 95px;
                          line-height: 25px;
                          letter-spacing: 0.7px;
                        "
                      >
                        <p style="margin-bottom: 0px">
                          Copyright © 2025 | <strong>BLOGPOINT.</strong> | All Rights
                          Reserved.
                        </p>
                        <p style="margin-top: 0px">Mahrajgunj, Kathmandu, Nepal</p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </body>
            </html>
        `,
      };

      // 'nodemailerTransporter' from utils folder
      nodemailerTransporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log("Error: ", error);
          return res.status(401).json({
            success: false,
            // message: "Password changed failed email!",
            message: "Token expired! Please try again",
          });
        }
        if (info) {
          console.log("Info: ", info);
          res.status(200).json({
            success: true,
            // message: "Password changed success email.",
            message: "Password updated. Please login your account",
          });
        }
      });

      /* res.status(200).json({
        success: true,
        message: "Password updated. Please login your account",
      }); */
    }
    /* else {
      return res
        .status(401)
        .json({ success: false, message: "Token expired! Please try again" });
    } */
  } catch (error) {
    next(error);
  }
};
