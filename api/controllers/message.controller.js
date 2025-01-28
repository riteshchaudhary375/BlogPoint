import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

export const createMessage = async (req, res, next) => {
  try {
    const { fullname, email, contact, message } = req.body;

    if (!fullname || !email || !message)
      return next(errorHandler(400, "All fields required!"));

    // 'phone' validation
    /* if (contact) {
      if (contact.length !== 10)
        return next(errorHandler(400, "Phone no. must be 10 digits"));

      
             // validation regex: 98(8-digits)
             // -----------------
             // e.g., 9845123456
             // regex: [9][8][0-9]{8}
             
      if (!contact.match(/^[9][8][0-9]{8}$/))
        return next(errorHandler(400, "Invalid contact!"));
    } */

    const newMessage = new Message({
      fullname,
      email,
      contact,
      message,
    });

    await newMessage.save();

    res
      .status(201)
      .json({ success: true, message: "Message sent", newMessage });
  } catch (error) {
    next(error);
  }
};

export const getMessages = async (req, res, next) => {
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

    const messages = await Message.find()
      // .sort({ createdAt: sortDirection })
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limit);

    const totalMessages = await Message.countDocuments();

    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthMessages = await Message.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res
      .status(200)
      .json({ success: true, messages, totalMessages, lastMonthMessages });
  } catch (error) {
    next(error);
  }
};

export const deleteMessage = async (req, res, next) => {
  const verifiedUser = await User.findById(req.user.id);
  if (!verifiedUser.isAdmin)
    return next(errorHandler(401, "Authorized for admin only!"));

  try {
    await Message.findByIdAndDelete(req.params.messageId);

    res.json({ success: true, message: "Message deleted!" });
  } catch (error) {
    next(error);
  }
};
