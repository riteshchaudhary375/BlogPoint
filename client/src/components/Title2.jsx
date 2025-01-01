import React from "react";

const Title2 = ({ text1, text2 }) => {
  return (
    <div className="inline-flex uppercase mb-4 md:mb-6">
      <p className="text-textColor2 text-xl">
        {text1}{" "}
        <span className="text-textColor1 font-medium">
          {text2}
          <span className="text-4xl">.</span>
        </span>
      </p>
    </div>
  );
};

export default Title2;
