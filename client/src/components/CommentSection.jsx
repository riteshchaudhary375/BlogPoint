import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Button from "./Button";
import Comment from "./Comment";

const CommentSection = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="w-full max-w-2xl p-4 my- border border-borderColor rounded-sm">
      {currentUser ? (
        <div className="flex items-center gap-3 my-5 text-textColor3 text-sm">
          <p>Signed in as:</p>
          <div className="flex items-end gap-1">
            <img
              src={currentUser.profilePicture}
              alt="profile_image"
              className="h-6 w-6 object-cover object-center rounded-full"
            />
            {currentUser.isAdmin && currentUser.isCreator ? (
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
        <div className="text-sm text-teal-500 flex gap-1">
          You must be signed in to comment.
          <Link to={"/sign-in"} className="text-blue-600 hover:underline">
            Sign in
          </Link>
        </div>
      )}

      {/* Comment Box */}
      <form>
        <textarea
          type="text"
          placeholder="Add a comment..."
          rows={"4"}
          maxLength={"200"}
          className="border border-borderColor outline-borderColorHover rounded-sm w-full px-4 py-2 text-sm bg-inherit resize-none"
        />
        <div className="flex items-center justify-between mt-2 px-4">
          <p className="text-textColor3 text-xs">123 characters remaining</p>
          <Button
            type={"submit"}
            text={"Submit"}
            className={"border border-bgDark hover:bg-lightBgHover text-xs"}
          />
        </div>
      </form>

      {/* Showing comment */}
      <div className="text-sm my-6 flex items-center gap-2">
        <p>Comments</p>
        <div className="border border-borderColor px-2 py-1 rounded-sm">
          <p>7</p>
        </div>
      </div>

      {/* Comment list */}
      <Comment comment={"Nice post"} />
    </div>
  );
};

export default CommentSection;
