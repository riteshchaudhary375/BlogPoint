import React from "react";
import { assets } from "../assets/assets";
import Button from "./Button";

const Modal = ({ onDeleteUser, setShowModal }) => {
  return (
    <div className="fixed inset-0 bg-opacity-5 backdrop-blur-sm flex items-center justify-center">
      <div className="w-full sm:w-[500px]">
        <div className="bg-lightBgHover border-borderColorHover rounded-sm mx-4 sm:mx-0 py-10 flex flex-col items-center justify-center gap-6">
          <img
            src={assets.exclamation}
            alt="error_icon"
            className="w-12 h-12 object-cover object-center"
          />
          <h3 className="text-xl text-textColor3">
            Are you sure you want to delete this user?
          </h3>
          <div className="flex items-center justify-center gap-4">
            <Button
              type={"button"}
              text={"Yes"}
              className={
                "w-[120px] text-center bg-red-700 text-textLight hover:bg-red-800"
              }
              handleClick={onDeleteUser}
            />
            <Button
              type={"button"}
              text={"Cancel"}
              className={
                "w-[120px] text-center border border-bgDark hover:bg-borderColorHover/20"
              }
              handleClick={() => setShowModal(false)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
