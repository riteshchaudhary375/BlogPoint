import User from "../models/user.model.js";
import Subscriber from "../models/subscriber.model.js";
import { errorHandler } from "../utils/error.js";

// Create a subscriber
export const createSubscriber = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) return next(errorHandler(400, "Email required!"));

    const alreadySubscribed = await Subscriber.findOne({ email });
    if (alreadySubscribed)
      return next(errorHandler(400, "Already subscribed!"));

    const newSubscriber = new Subscriber({ email });

    await newSubscriber.save();

    res.status(201).json({
      success: true,
      message: "Thank you for subscribing",
      newSubscriber,
    });
  } catch (error) {
    next(error);
  }
};

// Get all subscriber
export const getSubscribers = async (req, res, next) => {
  // console.log(req.params.userId);

  /* if (req.user.id !== req.params.userId)
    return next(errorHandler(400, "You are not allowed to see messages!"));

  const verifiedUser = await User.findById(req.params.userId);
  if (!verifiedUser.isAdmin)
    return next(errorHandler(401, "Authorized for admin only!")); */

  const verifiedUser = await User.findById(req.user.id);
  if (!verifiedUser.isAdmin)
    return next(errorHandler(401, "Authorized for admin only!"));

  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    // const sortDirection = req.query.sort === "desc" ? -1 : 1;

    const subscribers = await Subscriber.find()
      // .sort({ createdAt: sortDirection })
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limit);

    const totalSubscribers = await Subscriber.countDocuments();

    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthSubscribers = await Subscriber.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      success: true,
      subscribers,
      totalSubscribers,
      lastMonthSubscribers,
    });
  } catch (error) {
    next(error);
  }
};

// Delete subscriber
export const deleteSubscriber = async (req, res, next) => {
  const verifiedUser = await User.findById(req.user.id);
  if (!verifiedUser.isAdmin)
    return next(errorHandler(401, "Authorized for admin only!"));

  try {
    await Subscriber.findByIdAndDelete(req.params.subscriberId);

    res.json({ success: true, message: "Subscriber deleted!" });
  } catch (error) {
    next(error);
  }
};
