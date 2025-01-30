import React from "react";
import { FcExpired } from "react-icons/fc";

const TokenExpired = () => {
  return (
    <center className="min-h-screen">
      <div className="flex flex-col items-center justify-center mt-52">
        <FcExpired className="h-12 w-12 mb-5" />
        <h1 className="text-textColor2 font-bold text-3xl">Token Expired!</h1>
      </div>
    </center>
  );
};

export default TokenExpired;
