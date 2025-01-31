import React from "react";
import { useNavigate } from "react-router-dom";
import { MdErrorOutline } from "react-icons/md";

import Button from "../../components/Button";

const Failed = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen mt-28 sm:mt-36 md:mt-44">
      <div className="border border-borderColorHover rounded-sm max-w-lg mx-auto p-10">
        <div className="flex flex-col items-center justify-center gap-4">
          {/* <p className="text-xl text-red-600">X</p> */}
          <MdErrorOutline className="text-red-600 w-12 h-12 mb-4" />
          <p className="text-2xl text-textColor1 font-medium">Payment Failed</p>
          <p className="text-textColor2 text-center mb-2">
            Oops! Something went wrong with your payment.
            <br />
            Please try again
          </p>
          <Button
            type={"button"}
            text={"Back to Home"}
            className={"border border-bgDark hover:bg-lightBgHover"}
            handleClick={() => navigate("/")}
          />
        </div>
      </div>
    </div>
  );
};

export default Failed;
