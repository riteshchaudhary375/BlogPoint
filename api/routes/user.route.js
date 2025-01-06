import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  signout,
  test,
  updateUserProfile,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/test", test);
router.post("/signout", signout);
router.put("/updateUserProfile/:userId", verifyToken, updateUserProfile);

export default router;
