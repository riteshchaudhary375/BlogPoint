import User from "../models/user.model.js";
import SubscriptionPackage from "../models/subscription.package.model.js";
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
  /* console.log("params user id: ", req.params.userId);
  console.log("token user id: ", req.user.id); */

  if (req.user.id !== req.params.userId)
    return next(
      errorHandler(400, "You are not allowed to subscribe the package!")
    );

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
  /* console.log("params user id: ", req.params.userId);
  console.log("token user id: ", req.user.id); */

  if (req.user.id !== req.params.userId)
    return next(errorHandler(400, "User id failed!"));

  try {
    // const { orderID, subscriptionID } = req.body.data;
    const { orderID, subscriptionID, subscribedMethod } = req.body;
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

    // User details
    const userDetails = await User.findById(req.params.userId).select(
      "-password"
    );
    // console.log(userDetails);

    const subscribePlan = plans.find(
      (_plan) => _plan.plan_id === paypalData.plan_id
    );

    // passing subscription data to db
    const newSubscriptionData = new SubscriptionPackage({
      userId: req.params.userId,
      userData: userDetails,
      isSubscribed: true,
      subscribedPlan: subscribePlan.plan_name,
      duration: subscribePlan.duration,
      createdDate: paypalData.start_time,
      paymentMethod: subscribedMethod,
      currencyCode: paypalData.billing_info.last_payment.amount.currency_code,
      amount: paypalData.billing_info.last_payment.amount.value,
      paymentTime: paypalData.billing_info.last_payment.time,
      nextBilling: paypalData.billing_info.next_billing_time,
    });

    const savedSubscriptionData = await newSubscriptionData.save();

    res.status(200).json({
      success: true,
      message: "Subscribed successful",
      // paymentData: paypalData,
      // userDetails,
      subscribedData: savedSubscriptionData,
    });
  } catch (error) {
    next(error);
  }
};

// Get subscribed plan for specific user
export const getPlan = async (req, res, next) => {
  if (req.user.id !== req.params.userId)
    return next(errorHandler(400, "You are not allowed to get this data!"));
  try {
    const subscribedData = await SubscriptionPackage.find({
      userId: req.params.userId,
    });

    res.status(200).json({
      success: true,
      message: "Subscribed plan data fetched",
      subscribedData,
    });
  } catch (error) {
    next(error);
  }
};

// Get package enrolled for admin panel
export const getPackageEnrolled = async (req, res, next) => {
  const verifiedUser = await User.findById(req.user.id);
  if (!verifiedUser.isAdmin)
    return next(
      errorHandler(
        400,
        "You are not allowed to see list of enrolled subscribers!"
      )
    );

  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;

    const enrolledPackages = await SubscriptionPackage.find()
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limit);

    const totalEnrolledPackages = await SubscriptionPackage.countDocuments();

    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthEnrolledPackages = await SubscriptionPackage.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    let totalEarning = 0;
    for (let i = 0; i < enrolledPackages.length; i++) {
      totalEarning = totalEarning + parseInt(enrolledPackages[i].amount);
    }

    res.status(200).json({
      success: true,
      enrolledPackages,
      totalEnrolledPackages,
      lastMonthEnrolledPackages,
      totalEarning,
    });
  } catch (error) {
    next(error);
  }
};

// Delete package enrolled by admin
export const deletePackageEnrolled = async (req, res, next) => {
  try {
    const enrolledPackage = await SubscriptionPackage.findById(
      req.params.enrolledPackageId
    );
    // console.log(enrolledPackage._id);

    if (!enrolledPackage)
      return next(errorHandler(404, "Enrolled package not found"));

    const verifiedUser = await User.findById(req.user.id);

    if (enrolledPackage.userId !== verifiedUser.id && !verifiedUser.isAdmin)
      return next(
        errorHandler(
          403,
          "You are not allowed to delete this enrolled package subscribed detail!"
        )
      );

    /* if (enrolledPackage.userId !== req.user.id && !req.user.isAdmin)
      return next(
        errorHandler(403, "You are not allowed to delete this comment")
      ); */

    await SubscriptionPackage.findByIdAndDelete(enrolledPackage._id);

    res
      .status(200)
      .json({ success: true, message: "Enrolled package deleted!" });
  } catch (error) {
    next(error);
  }
};
