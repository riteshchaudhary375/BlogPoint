import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  createMessage,
  getMessages,
} from "../controllers/message.controller.js";

const router = express.Router();

router.post("/createMessage", createMessage);
router.get("/getMessages", verifyToken, getMessages);

export default router;
