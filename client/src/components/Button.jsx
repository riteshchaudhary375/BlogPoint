import React from "react";

const Button = ({ type, text, className, handleClick }) => {
  return (
    <button
      type={type}
      // className="border border-textColor1 font-medium uppercase bg-inherit px-7 py-2 rounded-sm hover:bg-lightBgHover transition-all duration-300"
      className={`${className} font-medium uppercase px-7 py-2 rounded-sm transition-all duration-300`}
      onClick={handleClick}
    >
      {text}
    </button>
  );
};

export default Button;
