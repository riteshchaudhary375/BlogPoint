import { errorHandler } from "../utils/error.js";
import dotenv from "dotenv";
dotenv.config();

// Plan variable
const plans = [
  {
    plan_id: "P-8A504626NH100601AM6OHWEI",
    plan_name: "basic",
    duration: "month",
  },
  {
    plan_id: "P-48W79418KC179623CM6OHXTY",
    plan_name: "professional",
    duration: "month",
  },
  {
    plan_id: "P-7TV8895421073550RM6OHY3A",
    plan_name: "enterprise",
    duration: "year",
  },
];

// Auth
const generateAccessToken = async () => {
  try {
    const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
    const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET;
    // console.log({ PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET });

    if (!PAYPAL_CLIENT_ID && !PAYPAL_CLIENT_SECRET)
      return next(errorHandler(404, "Invalid PayPal Credentials!"));

    const auth = Buffer.from(
      PAYPAL_CLIENT_ID + ":" + PAYPAL_CLIENT_SECRET
    ).toString("base64");

    // console.log({ auth });

    // const paypal_auth_url = `${process.env.PAYPAL_BASE_TEST}/v1/oauth2/token`;
    const url = `https://api-m.sandbox.paypal.com/v1/oauth2/token`;

    const response = await fetch(url, {
      method: "POST",
      headers: { Authorization: `Basic ${auth}` },
      body: "grant_type=client_credentials",
    });

    const data = await response.json();

    // console.log("generateAccessToken data", data);

    return data.access_token;
  } catch (error) {
    // console.log(error);
    next(error);
  }
};

// Create subscription
export const createSubscriptionPackage = async (req, res, next) => {
  try {
    const { plan_name, duration } = req.body;
    // console.log("plan_name", req.body.plan_name);
    // console.log("duration", req.body.duration);

    const plan = plans.find(
      (_plan) => _plan.duration === duration && _plan.plan_name === plan_name
    );
    // console.log("plan: ", plan);

    if (!plan) {
      return next(errorHandler(400, "Plan not found!"));
    }

    const accessToken = await generateAccessToken();
    // console.log("accessToken: ", accessToken);

    const url = `${process.env.PAYPAL_BASE_TEST}/v1/billing/subscriptions`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Prefer: "return=representation",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        plan_id: plan.plan_id,
        application_context: {
          user_action: "SUBSCRIBE_NOW",
        },
      }),
    });

    const data = await response.json();

    return res
      .status(200)
      .json({ status: data.status, paypalSubscription: data });
  } catch (error) {
    next(error);
  }
};

// Save order for subscriber
export const savePayment = async (req, res, next) => {
  try {
    // const { orderID, subscriptionID } = req.body.data;
    const { orderID, subscriptionID } = req.body;
    // console.log("orderID", orderID);
    // console.log("subscriptionID", subscriptionID);

    if (!orderID && !subscriptionID) {
      return next(errorHandler(400, "Order id or subscription id not found"));
    }

    // const url = `${process.env.PAYPAL_BASE_TEST}/v1/billing/subscriptions/${subscriptionID}`;
    const url = `https://api-m.sandbox.paypal.com/v1/billing/subscriptions/${subscriptionID}`;
    const accessToken = await generateAccessToken();

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Prefer: "return=representation",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const paypalData = await response.json();
    /* if (!response.ok) {
      console.log(paypalData.message);
      return;
    }
    if (response.ok) {
      console.log(paypalData);
      res.status(200).json({ success: true, message: "Success", paypalData });
    } */
    // console.log("paypalData: ", paypalData);

    res.status(200).json({
      success: true,
      message: "Subscribed successful",
      paymentData: paypalData,
    });
  } catch (error) {
    next(error);
  }
};
