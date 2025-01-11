import React from "react";
import { assets } from "../assets/assets";

const LoaderSpinner = () => {
  return (
      <div className="flex items-center justify-center">
        <img
          src={assets.spinner}
          alt="Loading Spinner"
          className="w-16 h-16 object-cover"
        />
      </div>
  );
};

export default LoaderSpinner;
