import React from "react";

const Title = ({ text1, text2 }) => {
  return (
    <div className="mb-4 w-full uppercase text-center">
      <div className="inline-flex">
        <p className="text-textColor2 text-3xl text-center">
          {text1}{" "}
          {text2 && (
            <span className="text-textColor1 font-medium">
              {text2}
              <span className="text-4xl">.</span>
            </span>
          )}
        </p>
        {/* <p>•</p> */}
      </div>
    </div>
  );
};

export default Title;
