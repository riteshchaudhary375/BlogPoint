import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import upload from "../utils/multer.js";
import {
  signout,
  test,
  updatePassword,
  updateUserProfileData,
  updateUserProfileImage,
  getUsers,
  deleteUser,
  getAllUsers,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/test", test);
router.post("/signout", signout);
router.put(
  "/updateUserProfileData/:userId",
  verifyToken,
  updateUserProfileData
);
router.put("/updatePassword/:userId", verifyToken, updatePassword);
router.post(
  "/updateUserProfileImage/:userId",
  upload.single("image"),
  verifyToken,
  updateUserProfileImage
);

router.get("/getUsers", verifyToken, getUsers);
router.get("/getAllUsers", getAllUsers);
router.delete("/deleteUser/:userId", verifyToken, deleteUser);

export default router;
