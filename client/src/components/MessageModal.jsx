import React from "react";
import Button from "./Button";
import Title2 from "./Title2";
import toast from "react-hot-toast";
import { data } from "react-router-dom";

const MessageModal = ({
  setShowMessageModal,
  messageItemData,
  onDeleteMessage,
}) => {
  return (
    messageItemData && (
      <div className="fixed inset-0 bg-opacity-5 backdrop-blur-sm flex items-center justify-center">
        <div className="w-full sm:w-[900px] bg-lightBgHover border-borderColorHover rounded-sm m-4 flex flex-col justify-center gap-2 md:mx-24 lg:mx-32 p-6">
          <div className="text-center">
            <Title2 text1={"Message"} text2={"Details"} />
          </div>

          {/* <div className="flex flex-col gap-1">
            <label
              htmlFor="createdAt"
              className="w-fit text-textColor3 flex items-center gap-2 text-xs"
            >
              Created At:
            </label>
            <input
              disabled
              type="text"
              id="createdAt"
              value={new Date(messageItemData.createdAt).toLocaleDateString()}
              className="border border-borderColor outline-borderColorHover rounded-sm w-full p-1.5 text-xs bg-inherit"
            />
          </div> */}

          <div className="text-textColor3 flex items-center gap-2 text-xs border border-borderColorHover w-fit rounded-sm p-1">
            <p>Created At:</p>
            <span className="text-textColor2 font-medium text-xs">
              {new Date(messageItemData.createdAt).toLocaleDateString()}
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="createdAt"
              className="w-fit text-textColor3 flex items-center gap-2 text-xs"
            >
              Full Name:
            </label>
            <input
              disabled
              type="text"
              id="createdAt"
              value={messageItemData.fullname}
              className="border border-borderColor outline-borderColorHover rounded-sm w-full p-1.5 text-xs bg-inherit"
            />
          </div>

          <div className="flex w-full items-center justify-between gap-2">
            <div className="flex-1 flex flex-col gap-1">
              <label
                htmlFor="createdAt"
                className="w-fit text-textColor3 flex items-center ga1.5 text-xs"
              >
                Email:
              </label>
              <input
                disabled
                type="text"
                id="createdAt"
                value={messageItemData.email}
                className="border border-borderColor outline-borderColorHover rounded-sm w-full p-1.5 text-xs bg-inherit"
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <label
                htmlFor="createdAt"
                className="w-fit text-textColor3 flex items-center gap-2 text-xs"
              >
                Contact:
              </label>
              <input
                disabled
                type="text"
                id="createdAt"
                value={messageItemData.contact}
                className="border border-borderColor outline-borderColorHover rounded-sm w-full p-1.5 text-xs bg-inherit"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="createdAt"
              className="w-fit text-textColor3 flex items-center gap-2 text-xs"
            >
              Message:
            </label>
            <textarea
              disabled
              type="text"
              id="createdAt"
              value={messageItemData.message}
              className="border border-borderColor outline-borderColorHover rounded-sm w-full p-1.5 text-sm bg-inherit resize-none"
            />
          </div>

          {/*   <div className="text-textColor3 flex items-center gap-2 text-xs">
            <p>Created At:</p>
            <span className="text-textColor2 font-medium text-xs">
              {new Date(messageItemData.createdAt).toLocaleDateString()}
            </span>
          </div>

          <div className="text-textColor3 flex items-center gap-2 text-sm">
            <p>Full Name:</p>
            <span className="text-textColor2 font-medium text-lg">
              {messageItemData.fullname}
            </span>
          </div>

          <div className="text-textColor3 flex items-center gap-2 text-sm">
            <p>Email:</p>
            <span className="text-textColor2 font-medium text-sm">
              {messageItemData.email}
            </span>
          </div>

          <div className="text-textColor3 flex items-center gap-2 text-sm">
            <p>Contact:</p>
            <span className="text-textColor2 font-medium text-sm">
              {messageItemData.contact}
            </span>
          </div>

          <div className="text-textColor3 flex items-center gap-2 text-sm">
            <p>Message:</p>
            <span className="text-textColor2 font-medium text-sm">
              {messageItemData.message}
            </span>
          </div> */}

          <div className="text-center mt-2">
            <Button
              type={"button"}
              text={"Back"}
              className={
                "w-[120px] text-center border border-bgDark hover:bg-borderColorHover/20 text-xs"
              }
              handleClick={() => setShowMessageModal(false)}
            />

            <Button
              type={"button"}
              text={"Delete"}
              className={
                "ml-3 w-[120px] text-center bg-red-600 text-textLight hover:bg-red-700 text-xs"
              }
              handleClick={() => onDeleteMessage(messageItemData._id)}
            />
          </div>
        </div>
      </div>
    )
  );
};

export default MessageModal;
