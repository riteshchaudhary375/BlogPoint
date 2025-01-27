import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  createMessage,
  deleteMessage,
  getMessages,
} from "../controllers/message.controller.js";

const router = express.Router();

router.post("/createMessage", createMessage);
router.get("/getMessages", verifyToken, getMessages);
router.delete("/deleteMessage/:messageId", verifyToken, deleteMessage);

export default router;
