import React from "react";
import { LuServerOff } from "react-icons/lu";

const PageNotFound = () => {
  return (
    <center className="min-h-screen">
      <div className="flex flex-col items-center justify-center mt-52">
        <LuServerOff className="h-12 w-12 mb-5" />
        <h1 className="text-textColor2 font-bold text-3xl">Page Not Found!</h1>
      </div>
    </center>
  );
};

export default PageNotFound;
