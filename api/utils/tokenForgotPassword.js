import jwt from "jsonwebtoken";
import crypto from "crypto"; // default model of nodejs

// Generate token
export const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    // expiresIn: "1d",
    expiresIn: "180s", // 3mins
  });
};

// Hash token
export const hashToken = (token) => {
  return crypto.createHash("sha256").update(token.toString()).digest("hex");
};
