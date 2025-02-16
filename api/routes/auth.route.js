import express from "express";
import {
  forgotPassword,
  google,
  newPassword,
  resetPassword,
  signin,
  signup,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/google", google);

// forgot-password
router.post("/forgotPassword", forgotPassword);
// reset-password
router.get("/reset-password/:id/:token", resetPassword);
router.post("/:id/:token", newPassword);

export default router;
