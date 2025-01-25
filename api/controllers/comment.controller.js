import Comment from "../models/comment.model.js";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

// Create new comment
export const createComment = async (req, res, next) => {
  try {
    const { content, postId, userId } = req.body;

    if (userId !== req.user.id)
      return next(
        errorHandler(403, "You are not allowed to create the comment")
      );

    const newComment = new Comment({
      content,
      postId,
      userId,
    });

    await newComment.save();

    res
      .status(201)
      .json({ success: true, message: "Comment submitted", newComment });
  } catch (error) {
    next(error);
  }
};

// Get comments
export const getPostComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId }).sort({
      createdAt: -1,
    });
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};

// Put likeComment
export const likeComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) return next(errorHandler(404, "Comment not found"));

    const userIndex = comment.likes.indexOf(req.user.id);
    if (userIndex === -1) {
      comment.numberOfLikes += 1;
      comment.likes.push(req.user.id);
    } else {
      comment.numberOfLikes -= 1;
      comment.likes.splice(userIndex, 1);
    }

    await comment.save();

    res.status(200).json(comment);
  } catch (error) {
    next(next);
  }
};

// Put editComment
export const editComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) return next(errorHandler(404, "Comment not found"));

    if (comment.userId !== req.user.id && !req.user.isAdmin)
      return next(
        errorHandler(403, "You are not allowed to edit this comment")
      );

    const editedComment = await Comment.findByIdAndUpdate(
      req.params.commentId,
      {
        content: req.body.content,
      },
      { new: true }
    );

    res
      .status(200)
      .json({ success: true, message: "Comment edited", editedComment });
  } catch (error) {
    next(error);
  }
};

// Delete comment
export const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) return next(errorHandler(404, "Comment not found"));

    if (comment.userId !== req.user.id && !req.user.isAdmin)
      return next(
        errorHandler(403, "You are not allowed to delete this comment")
      );

    await Comment.findByIdAndDelete(comment);

    res.status(200).json({ success: true, message: "Comment deleted" });
  } catch (error) {
    next(error);
  }
};

// Get comments for Admin panel
export const getcomments = async (req, res, next) => {
  // console.log(req.user);
  const verifiedUser = await User.findById(req.user.id);
  // console.log(verifiedUser);

  if (!verifiedUser.isAdmin)
    return next(errorHandler(403, "You are not allowed to get all comments"));

  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.sort === "desc" ? -1 : 1;

    const comments = await Comment.find()
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalComments = await Comment.countDocuments();

    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthComments = await Comment.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({ comments, totalComments, lastMonthComments });
  } catch (error) {
    next(error);
  }
};
