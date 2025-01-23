import React from "react";

import { assets } from "../assets/assets";

const Comment = ({ comment }) => {
  return (
    <div>
      {/* Comment user profile image */}
      <div className="flex-shrink-0 mr-3">
        <img
          src={assets.profile_picture_blank}
          alt="comment_user" // alt={user.username}
          className="w-10 h-10 rounded-full bg-gray-200"
        />
      </div>

      {/* Comment user name */}
      <div className="flex-1">
        <div className="flex items-center mb-1">
          <span className="font-bold text-xs mr-1 truncate">@ramkumar</span>
        </div>
      </div>
    </div>
  );
};

export default Comment;
