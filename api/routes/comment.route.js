import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  createComment,
  getPostComments,
  likeComment,
  editComment,
  deleteComment,
  getcomments,
  getCreatorPostComment,
  deleteCommentByCreator,
} from "../controllers/comment.controller.js";

const router = express.Router();

router.post("/create", verifyToken, createComment);
router.get("/getPostComments/:postId", getPostComments);
router.put("/likeComment/:commentId", verifyToken, likeComment);
router.put("/editComment/:commentId", verifyToken, editComment);
router.delete("/deleteComment/:commentId", verifyToken, deleteComment);
router.get("/getcomments", verifyToken, getcomments);
router.get(
  "/getCreatorPostComment/:userId",
  verifyToken,
  getCreatorPostComment
);
router.delete(
  "/deleteCommentByCreator/:userId/:commentId",
  verifyToken,
  deleteCommentByCreator
);

export default router;
