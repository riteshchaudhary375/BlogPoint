import React from "react";
import Button from "./Button";

const NewsLetterBox = () => {
  return (
    <div className="text-center my-32">
      <p className="text-2xl font-medium text-textColor1">
        Subscribe now & read the latest blog
      </p>

      <p className="text-textColor3 mt-3">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque, itaque.
      </p>

      <form className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border border-bgDark rounded-sm border-r-0 pl-3">
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full sm:flex-1 outline-none bg-inherit"
          required
        />

        <Button
          type={"submit"}
          text={"Subscribe"}
          className={
            "text-textLight bg-bgDark border-none outline-none bg-opacity-95 hover:bg-opacity-100"
          }
          handleClick={() => alert("Processing...")}
        />
      </form>
    </div>
  );
};

export default NewsLetterBox;
