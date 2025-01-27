import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  createSubscriber,
  deleteSubscriber,
  getSubscribers,
} from "../controllers/subscriber.controller.js";

const router = express.Router();

router.post("/createSubscriber", createSubscriber);
router.get("/getSubscribers", verifyToken, getSubscribers);
router.delete("/deleteSubscriber/:subscriberId", verifyToken, deleteSubscriber);

export default router;
