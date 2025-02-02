import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  createSubscriptionPackage,
  getPackageEnrolled,
  getPlan,
  savePayment,
} from "../controllers/subscription.package.controller.js";

const router = express.Router();

router.post("/create/:userId", verifyToken, createSubscriptionPackage);
router.post("/savePayment/:userId", verifyToken, savePayment);
router.get("/getPlan/:userId", verifyToken, getPlan);
router.get("/getPackageEnrolled", verifyToken, getPackageEnrolled);

export default router;
