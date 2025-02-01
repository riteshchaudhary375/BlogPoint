import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  createSubscriptionPackage,
  savePayment,
} from "../controllers/subscription.package.controller.js";

const router = express.Router();

router.post("/create", createSubscriptionPackage);
router.post("/savePayment", savePayment);

export default router;
