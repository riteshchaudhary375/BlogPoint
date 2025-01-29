import express from "express";
import {
  forgotPassword,
  google,
  signin,
  signup,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/google", google);

// forgot-password
router.post("/forgotPassword", forgotPassword);

export default router;
