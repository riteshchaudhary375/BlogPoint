import { v2 as cloudinary } from "cloudinary";

import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

// Create post
export const create = async (req, res, next) => {
  // console.log(req.user);
  const userVerified = await User.findById(req.user.id);
  // console.log(userAdmin);

  // check user is admin or not, using cookie user
  if (!userVerified.isAdmin) {
    return next(errorHandler(403, "You are not allowed to create the post"));
  }

  if (!req.body.title) {
    return next(errorHandler(400, "Title of the post is required!"));
  }

  if (!req.body.content) {
    return next(errorHandler(400, "Content of the post is required!"));
  }

  if (!req.body.category) {
    return next(errorHandler(400, "Category of the post is required!"));
  }

  // Slug for the post for better SEO
  const slug = req.body.title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, "");

  // using multer we upload image file
  const imageFile = req.file;

  if (!imageFile) return next(errorHandler(400, "Error on uploading image!"));

  // upload image to cloudinary
  // 1. uploading to cloudinary from local system
  const imageUpload = await cloudinary.uploader.upload(
    imageFile.path,
    {
      // upload_preset:'unsigned_upload',
      allowed_formats: ["png", "jpg", "jpeg", "svg", "ico", "jfif", "webp"],
      // public_id:"avatar",
      resource_type: "image",
    },
    function (error, result) {
      if (error) {
        next(errorHandler(error.message));
        // console.log(error);
        return;
      }
      // console.log(result);
    }
  );
  // 2. storing link of that image from cloudinary into variable
  const imageURL = imageUpload.secure_url;

  // 3. update profile image into database

  const newPost = new Post({
    // userId: req.user.id, // user from token for filtering admin for their particular post
    userId: userVerified.id, // user from token for filtering admin for their particular post
    //   ...req.body, // all from body
    title: req.body.title,
    image: imageURL,
    content: req.body.content,
    category: req.body.category,
    slug, // adding slug to the post
    createdDate: Date.now(),
  });

  try {
    const savedPost = await newPost.save();

    res
      .status(201)
      .json({ success: true, message: "New post created", savedPost });
  } catch (error) {
    next(error);
  }
};
