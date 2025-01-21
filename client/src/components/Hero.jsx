import React from "react";
import { assets } from "../assets/assets";

const Hero = () => {
  return (
    <div className="pt-2 sm:pt-6 md:pt-8 container">
      <div className="border border-gray-400 pt-14 md:pt-16 lg:pt-12 flex flex-col items-center gap-2 md:gap-0 md:flex-row rounded-md bg-gradient-to-b from-bgLight to-textColor2 md:bg-gradient-to-r md:from-bgLight md:to-textColor2">
        {/* Left */}
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <div className="w-2/3 text-[#414141]">
            <div>
              <p className="text-sm sm:text-base md:text-lg text-center md:text-start uppercase text-nowrap">
                Find your next favorite _
              </p>

              <h1 className="prata-regular text-3xl md:text-4xl text-textColor1 sm:py-3 lg:text-5xl leading-relaxed text-center">
                Article.
              </h1>

              {/* <p className="text-sm sm:text-base md:text-lg text-end">today!</p> */}
            </div>
          </div>
        </div>

        {/* Right */}
        {/* <div className="w-full md:w-1/2"> */}
        <img
          src={assets.man_cellular_illust}
          alt="hero image"
          className="w-[350px] h-[250px] md:h-auto md:w-1/2 object-cover"
        />
        {/* </div> */}
      </div>
    </div>
  );
};

export default Hero;
