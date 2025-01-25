import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Button from "./Button";
import Comment from "./Comment";
import Modal from "./Modal";

const CommentSection = ({ postDataID, showModal, setShowModal }) => {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [comment, setComment] = useState(""); // for writting new comment store
  // console.log(comment);

  const [commentError, setCommentError] = useState(null);
  const [comments, setComments] = useState([]); // for store fetched comments from api
  // console.log(comments);

  // const [showModal, setShowModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);

  // Submit new comment
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (comment.length > 200) return;

    try {
      setCommentError(null);
      const res = await fetch(`/api/comment/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: comment,
          postId: postDataID,
          userId: currentUser._id,
        }),
      });
      const data = await res.json();
      // console.log(data);

      if (!res.ok) {
        // console.log(data.message);
        setCommentError(data.message);
        return;
      } else {
        setCommentError(null);
        setComment("");
        setComments([data.newComment, ...comments]); // this will add db data as well as latest post comments also
        toast.success(data.message);
      }
    } catch (error) {
      // console.log(error.message);
      setCommentError(error.message);
    }
  };

  // Fetching current post comment = 8:46:05
  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await fetch(`/api/comment/getPostComments/${postDataID}`);
        /* const data = await res.json();
        if (!res.ok) {
          console.log(data.message);
          return;
        } else {
          setComments(data);
        } */
        if (res.ok) {
          const data = await res.json();
          // console.log(data);

          setComments(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getComments();
  }, [postDataID]);

  // Handle like button = 9:06:37
  const handleLike = async (commentId) => {
    try {
      if (!currentUser) {
        navigate("/sign-in");
        return;
      } else {
        const res = await fetch(`/api/comment/likeComment/${commentId}`, {
          method: "PUT",
        });
        const data = await res.json();
        if (!res.ok) {
          console.log(data.message);
          return;
        } else {
          setComments(
            comments.map((comment) =>
              comment._id === commentId
                ? {
                    ...comment,
                    likes: data.likes,
                    numberOfLikes: data.likes.length,
                  }
                : comment
            )
          );
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // Handle edit button = 9:24:00
  const handleEdit = async (comment, editedContent) => {
    setComments(
      comments.map((c) =>
        c._id === comment._id ? { ...c, content: editedContent } : c
      )
    );
  };

  // Handle delete comment = 9:39:02
  const handleDelete = async (commentId) => {
    setShowModal(false);
    try {
      if (!currentUser) {
        navigate("/sign-in");
        return;
      }
      const res = await fetch(`/api/comment/deleteComment/${commentId}`, {
        method: "DELETE",
      });
      /* const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
        return;
      } else {
        console.log("Comment deleted successful");
      } */

      if (res.ok) {
        const data = await res.json();
        /* comments.map((comment) => {
          if (comment._id === commentId) {
            setComments(
              comments.filter((comment) => comment._id !== commentId)
            );
          }
        }); */
        setComments(comments.filter((comment) => comment._id !== commentId));
        toast.success(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    // <div className="w-full max-w-2xl p-4 my-12">
    // <div className="w-full p-4 my-12 border border-borderColor rounded-sm">
    <div className="w-full p-4 my-12">
      {currentUser ? (
        <div className="flex items-center gap-2 my-2 text-textColor3 text-sm">
          <p>Signed in as:</p>
          <div className="flex items-end gap-1">
            <img
              src={currentUser.profilePicture}
              alt="profile_image"
              className="h-6 w-6 object-cover object-center rounded-full"
            />
            {currentUser.isAdmin || currentUser.isCreator ? (
              <Link
                to={"/dashboard?tab=profile"}
                className="text-xs text-cyan-600 hover:underline"
              >
                @{currentUser.username}
              </Link>
            ) : (
              <Link
                to={"/profile"}
                className="text-xs text-cyan-600 hover:underline"
              >
                @{currentUser.username}
              </Link>
            )}
          </div>
        </div>
      ) : (
        <div className="text-sm text-teal-500 flex gap-1 py-4">
          You must be signed in to comment.
          <Link to={"/sign-in"} className="text-blue-600 hover:underline">
            Sign in
          </Link>
        </div>
      )}

      {/* Comment Box = 8:22:40 */}
      {currentUser && (
        <form
          className="border border-borderColor rounded-sm p-3"
          onSubmit={handleSubmit}
        >
          <textarea
            type="text"
            placeholder="Add a comment..."
            rows={"4"}
            maxLength={"200"}
            className="border border-borderColor outline-borderColorHover rounded-sm w-full px-3 py-2 text-sm bg-inherit resize-none"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <div className="flex items-center justify-between mt-2 px-4">
            <p className="text-textColor3 text-xs">
              {/* {200 - comment.length}characters remaining */}
              {200 - comment.length}{" "}
              {200 - comment.length <= 1 ? "character" : "characters"} remaining
            </p>
            <Button
              type={"submit"}
              text={"Submit"}
              className={"border border-bgDark hover:bg-lightBgHover text-xs"}
            />
          </div>

          {/* Comment send error */}
          {commentError && (
            <p className="text-xs text-red-600 mt-4">{commentError}</p>
          )}
        </form>
      )}

      {/* Showing comment of the post */}
      {comments.length === 0 ? (
        <p className="text-sm my-6">No comment yet!</p>
      ) : (
        <>
          <div className="text-sm my-6 flex items-center gap-2">
            <p>Comments:</p>
            <div className="border border-borderColor px-2 py-1 rounded-sm">
              <p>{comments.length}</p>
            </div>
          </div>

          {/* Comment list */}
          {comments &&
            comments.map((comment, index) => (
              <Comment
                key={index}
                comment={comment}
                onLike={handleLike}
                onEdit={handleEdit}
                onDelete={(commentId) => {
                  setShowModal(true);
                  setCommentToDelete(commentId);
                }}
              />
            ))}
        </>
      )}

      {/* Delete Modal Popup */}
      {showModal && (
        <Modal
          text={"Are you sure you want to delete this comment?"}
          setShowModal={setShowModal}
          onDeleteUser={() => handleDelete(commentToDelete)}
        />
      )}
    </div>
  );
};

export default CommentSection;
