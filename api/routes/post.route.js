import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import upload from "../utils/multer.js";
import { create } from "../controllers/post.controller.js";

const router = express.Router();

router.post("/create", upload.single("image"), verifyToken, create);

export default router;
