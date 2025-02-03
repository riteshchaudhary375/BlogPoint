import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import upload from "../utils/multer.js";
import {
  create,
  deletePost,
  getAllPostsForAdmin,
  getCreatorPostsOnly,
  getPosts,
  getSlugPost,
  update,
} from "../controllers/post.controller.js";

const router = express.Router();

router.get("/getAllPostsForAdmin", verifyToken, getAllPostsForAdmin);
router.get("/get", getPosts);
router.get("/getCreatorPostsOnly/:userId", verifyToken, getCreatorPostsOnly);
router.get("/getSlugPost/:postId", getSlugPost);
router.delete("/delete/:postId/:userId", verifyToken, deletePost);
router.post("/create/:userId", upload.single("image"), verifyToken, create);
router.put(
  "/update/:postId/:userId",
  upload.single("image"),
  verifyToken,
  update
);

export default router;
