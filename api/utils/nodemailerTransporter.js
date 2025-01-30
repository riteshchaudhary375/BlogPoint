import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

// Create mail transporter
const nodemailerTransporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  service: "gmail",
  port: "465",
  secure: true,
  /* port: 587,
  secure: false, //true for 465, false for other ports
   */
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

export default nodemailerTransporter;
