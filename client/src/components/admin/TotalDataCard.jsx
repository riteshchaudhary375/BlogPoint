import React from "react";
import { assets } from "../../assets/assets";

const TotalDataCard = ({ title, totalData, icon, lastMonthData }) => {
  return (
    <div className="w-full md:w-72 rounded-sm shadow-md border border-borderColor p-4">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between">
          <div>
            <h3 className="text-xl text-textColor2 font-light">{title}</h3>
            <p className="text-2xl text-textColor1">{totalData}</p>
          </div>
          <img
            src={icon}
            alt="card_icon"
            className="w-12 h-12 object-cover object-center"
          />
        </div>
        <div className="flex gap-2 items-center">
          <span className="text-blue-700 flex items-center font-medium">
            <img
              src={assets.arrow_up_navigation}
              alt="arrow_up_icon"
              className="w-4 h-4 object-cover object-center"
            />
            {lastMonthData}
          </span>
          <p className="text-textColor3 text-sm font-light">Last month</p>
        </div>
      </div>
    </div>
  );
};

export default TotalDataCard;
