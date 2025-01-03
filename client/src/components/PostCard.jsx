import React from "react";
import { Link } from "react-router-dom";
import Badge from "./Badge";

const PostCard = ({
  id,
  title,
  description,
  category,
  image,
  date,
  postCreatorProfile,
  postCreatorName,
  read,
}) => {
  return (
    <div className="w-full border border-borderColor hover:border-borderColorHover rounded-sm h-[430px] overflow-hidden transition-all duration-300 ease-in">
      <Link to={`/posts/${id}`}>
        <img
          src={image}
          alt={title}
          className="w-full h-[260px] object-cover"
        />

        <div className="p-3 flex flex-col">
          <div className="text-textColor3 flex items-center justify-between">
            {/* Created Date */}
            <div className="flex items-center gap-1 text-sm font-medium">
              <p className="text-textColor2">{date}</p>
              <span className="text-xl">•</span>
              <p className="text-xs">{read}</p>
            </div>
            {/* Category */}
            {/*  <span className="text-xs inline-flex flex-nowrap items-center bg-lightBgHover px-1 py-0.5 ring-1 ring-inset ring-borderColor rounded-sm">
              {category}
            </span> */}
            <Badge
              badgeTitle={category}
              textSize={"xs"}
              paddingX={"1"}
              paddingY={"0.5"}
            />
          </div>

          {/* Title */}
          <p className="text-lg font-medium line-clamp-1 mt-1 text-textColor2">
            {title}
          </p>

          {/* Description */}
          <p className="text-sm text-textColor3 line-clamp-2">{description}</p>

          {/* Created Profile */}
          <div className="flex gap-1 mt-4">
            <img
              src={postCreatorProfile}
              alt="Creator profile"
              className="w-6 h-6 rounded-full opacity-90"
            />
            <p className="text-base font-medium text-textColor3">
              {postCreatorName}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PostCard;
