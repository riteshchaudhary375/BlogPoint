import React from "react";
import { assets } from "../assets/assets";

const Notification = ({ text }) => {
  return (
    <div className="min-h-screen">
      <div className="w-full">
        <div className="w-full md:w-[400px] lg:w-[450px] mx-auto bg-lightBgHover">
          <div className="flex flex-col gap-4 items-center justify-center px-6 py-10 border border-borderColor rounded-sm">
            <img
              src={assets.no_document}
              alt="Error"
              className="w-12 h-12 object-cover"
            />
            <p className="text-xl font-base">{text}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;
