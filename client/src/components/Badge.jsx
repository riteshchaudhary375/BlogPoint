import React from "react";

const Badge = ({ badgeTitle, textSize, paddingX, paddingY }) => {
  return (
    <span
      className={`text-${textSize} inline-flex flex-nowrap items-center bg-lightBgHover px-${paddingX} py-${paddingY} ring-1 ring-inset ring-borderColor rounded-sm`}
    >
      {badgeTitle}
    </span>
  );
};

export default Badge;
