import React from "react";
import { Link } from "react-router-dom";
import Badge from "./Badge";

const RelatedPostCard = ({
  postId,
  postSlug,
  title,
  content,
  category,
  image,
  date,
  postCreatorData,
}) => {
  return (
    <div className="w-[320px] border border-borderColor hover:border-borderColorHover rounded-sm overflow-hidden transition-all duration-300 ease-in">
      <Link to={`/post/${postSlug}`}>
        <img
          src={image}
          alt={title}
          className="w-full h-[200px] object-cover object-center"
        />

        <div className="p-3 flex flex-col">
          <div className="text-textColor3 flex items-center justify-between">
            {/* Created Date */}
            <div className="flex items-center gap-1 text-sm font-medium">
              <p className="text-textColor2">
                {new Date(date).toLocaleDateString()}
              </p>
              <span className="text-xl">•</span>
              <p className="text-xs">
                {(content.length / 1000).toFixed(0)}{" "}
                {(content.length / 1000).toFixed(0) > 0 ? "mins" : "min"} read
              </p>
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
          {/* <p className="text-sm text-textColor3 line-clamp-2">{content}</p> */}
          <p
            className="text-sm text-textColor3 line-clamp-1 post-content" // 'post-content' is a custom css written in 'index.css'
            dangerouslySetInnerHTML={{
              __html: content,
            }}
          ></p>

          {/* Created Profile */}
          <div className="flex gap-1 mt-2">
            <img
              src={postCreatorData.profilePicture}
              alt="Creator profile"
              className="w-6 h-6 rounded-full"
            />
            <p className="text-base font-medium text-textColor3">
              {postCreatorData.username}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default RelatedPostCard;
