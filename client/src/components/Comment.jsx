import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaThumbsUp } from "react-icons/fa";
import moment from "moment";

// import { assets } from "../assets/assets";
import Button from "./Button";
import toast from "react-hot-toast";

const Comment = ({ comment, onLike, onEdit, onDelete }) => {
  // console.log(comment);
  const { currentUser } = useSelector((state) => state.user);

  const [user, setUser] = useState({});
  // console.log(user);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);

  // Fetching user from userId
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/user/${comment.userId}`);
        const data = await res.json();
        if (!res.ok) {
          console.log(data.message);
          return;
        } else {
          setUser(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getUser();
  }, [comment]);

  // Handle edit comment
  const handleEdit = () => {
    setIsEditing(true);
    setEditedContent(comment.content);
  };

  // Handle update comment
  const handleSave = async () => {
    try {
      const res = await fetch(`/api/comment/editComment/${comment._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: editedContent,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setIsEditing(false);
        onEdit(comment, editedContent);
        toast.success(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex p-4 border-b dark:border-gray-600 text-sm">
      <div className="flex-shrink-0 mr-3">
        <img
          src={user.profilePicture}
          alt={user.username}
          className="w-10 h-10 rounded-full bg-gray-200"
        />
      </div>

      <div className="flex-1">
        <div className="flex items-center mb-1">
          <span className="font-bold mr-1 text-xs truncate">
            {user ? `@${user.username}` : "anonymous user"}
          </span>
          {/* npm i moment, for date created */}
          <span className="text-gray-500 text-xs">
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>

        {/* for editing and writing comment */}
        {isEditing ? (
          <>
            <textarea
              // className="mb-2"
              rows={"2"}
              maxLength={"200"}
              className="mb-2 border border-borderColor outline-borderColorHover rounded-sm w-full px-3 py-2 text-sm bg-inherit resize-none"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
            <div className="flex justify-end gap-2 text-xs">
              {/* <Button
                type="button"
                size="sm"
                gradientDuoTone="purpleToBlue"
                outline
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button> */}
              <Button
                type={"button"}
                text={"Cancel"}
                className={
                  "border border-bgDark hover:bg-lightBgHover w-[100px]"
                }
                handleClick={() => setIsEditing(false)}
              />
              {/* <Button
                type="button"
                size="sm"
                gradientDuoTone="purpleToBlue"
                onClick={handleSave}
              >
                Save
              </Button> */}
              <Button
                type={"button"}
                text={"Save"}
                className={
                  "text-textLight bg-bgDark border-none outline-none hover:bg-opacity-[93%] w-[100px]"
                }
                handleClick={handleSave}
              >
                Save
              </Button>
            </div>
          </>
        ) : (
          <>
            <p className="text-gray-500 pb-2">{comment.content}</p>

            <div className="flex items-center pt-2 text-xs border-t dark:border-gray-700 max-w-fit gap-2">
              <button
                type="button"
                className={`text-textColor3 hover:text-textColor2 ${
                  currentUser &&
                  comment &&
                  comment.likes.includes(currentUser._id)
                    ? "!text-blue-500"
                    : "text-textColor3"
                }`}
                onClick={() => onLike(comment._id)}
              >
                <FaThumbsUp className="text-sm" />
              </button>

              {/* Number of likes on post */}
              <p className="text-textColor2">
                {comment.numberOfLikes > 0 &&
                  comment.numberOfLikes +
                    " " +
                    (comment.numberOfLikes === 1 ? "like" : "likes")}
              </p>

              {currentUser &&
                (currentUser._id === comment.userId || currentUser.isAdmin) && (
                  <>
                    <button
                      className="text-textColor3 hover:text-blue-500"
                      onClick={handleEdit}
                    >
                      Edit
                    </button>

                    <button
                      className="text-textColor3 hover:text-red-500"
                      onClick={() => onDelete(comment._id)}
                    >
                      Delete
                    </button>
                  </>
                )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Comment;
