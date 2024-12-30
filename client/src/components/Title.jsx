import React from "react";

const Title = ({ text1, text2 }) => {
  return (
    <div className="inline-flex gap-2 items-center mb-3 uppercase">
      <p className="text-textColor2">
        {text1}{" "}
        <span className="text-textColor1 font-medium">
          {text2}
          <span className="text-4xl">.</span>
        </span>
      </p>
      {/* <p>•</p> */}
    </div>
  );
};

export default Title;
