import { v2 as cloudinary } from "cloudinary";

import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

// Get all posts
export const getAllPostsForAdmin = async (req, res, next) => {
  const userVerified = await User.findById(req.user.id);

  // check user is admin or not, using cookie user
  if (!userVerified.isAdmin)
    return next(errorHandler(403, "You are not allowed to get all posts"));

  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.sort === "asc" ? 1 : -1;

    const posts = await Post.find()
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalPosts = await Post.countDocuments();

    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthPosts = await Post.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      posts,
      totalPosts,
      lastMonthPosts,
    });
  } catch (error) {
    next(error);
  }
};

// Get posts
export const getPosts = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === "asc" ? 1 : -1;

    // below queries is used in path location for searching and sorting
    const posts = await Post.find({
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.postId && { _id: req.query.postId }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $options: "i" } },
          { content: { $regex: req.query.searchTerm, $options: "i" } },
        ],
      }),
    })
      .skip(startIndex)
      .limit(limit)
      .sort({ updatedAt: sortDirection });

    const totalPosts = await Post.countDocuments();

    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1, // decreasing this (cueeent) month
      now.getDate()
    );

    const lastMonthPosts = await Post.countDocuments({
      createdAt: { $gte: oneMonthAgo }, // for last month = same year and same time but decreasing 1 month from now (date / time).
    });

    res.status(200).json({
      posts,
      totalPosts,
      lastMonthPosts,
    });
  } catch (error) {
    next(error);
  }
};

// Delete post
export const deletePost = async (req, res, next) => {
  try {
    const userValid = await User.findById(req.user.id);
    if (!userValid.isAdmin || req.user.id !== req.params.userId)
      return next(errorHandler(403, "You are not allowed to delete this post"));

    await Post.findByIdAndDelete(req.params.postId);

    res.status(200).json({ success: true, message: "Post deleted!" });
  } catch (error) {
    next(error);
  }
};

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

// Update post
export const update = async (req, res, next) => {
  try {
    const userValid = await User.findById(req.user.id);
    // console.log(userValid);

    if (req.params.userId !== userValid.id && !userValid.isAdmin) {
      return next(
        errorHandler(403, "You are not allowed to update this post!")
      );
    }

    const imageFile = req.file;

    let imageURL;

    // if (!imageFile) return next(errorHandler(400, "Error on uploading image!"));
    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(
        imageFile.path,
        {
          allowed_formats: ["png", "jpg", "jpeg", "svg", "ico", "jfif", "webp"],
          resource_type: "image",
        }
        /* function (error, result) {
        if (error) {
          next(errorHandler(error.message));
          return;
        }
      } */
      );
      imageURL = imageUpload.secure_url;
    }

    let slug;
    if (req.body.title) {
      slug = req.body.title
        .split(" ")
        .join("-")
        .toLowerCase()
        .replace(/[^a-zA-Z0-9-]/g, "");
    }

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.postId,
      {
        $set: {
          title: req.body.title,
          content: req.body.content,
          category: req.body.category,
          slug,
          image: imageURL,
          updateDate: new Date(Date.now()),
        },
      },
      { new: true }
    );

    res
      .status(200)
      .json({ success: true, message: "Post updated", updatedPost });
  } catch (error) {
    next(error);
  }
};
