import React from "react";

import { assets } from "../assets/assets";
// import Button from "./Button";

const CallToAction = () => {
  return (
    <div className="flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center">
      <div className="flex-1 flex flex-col items-center justify-center">
        <h2 className="text-2xl text-textColor1">
          Want to learn more about MERN Stack?
        </h2>
        <p className="text-textColor3 my-2">
          Checkout these resources with by this action
        </p>
        {/* <Button
          type={"button"}
          text={"Learn More"}
          className={"border border-bgDark hover:bg-lightBgHover text-xs"}
        /> */}
        <button className="w-full border border-bgDark hover:bg-lightBgHover text-xs font-medium uppercase px-7 py-2 rounded-tl-xl rounded-bl-none rounded-br-xl rounded-tr-none  transition-all duration-300">
          <a
            href="https://www.linkedin.com/in/riteshchaudhary7/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn More
          </a>
        </button>
      </div>

      <div className="p-7 flex-1">
        <img
          src={assets.mern_stack}
          alt="image"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default CallToAction;
