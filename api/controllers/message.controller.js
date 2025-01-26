import Message from "../models/message.model.js";
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
