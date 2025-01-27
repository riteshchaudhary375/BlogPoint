import React, { useState } from "react";

import Button from "../Button";
import MessageModal from "../MessageModal";

const MessageListItem = ({
  listTitle,
  data,
  showMore,
  showMoreClick,
  showModal,
  setShowModal,
  idToDelete,
  onClickMessageItem,
}) => {
  // console.log(data);

  return (
    <div className="flex flex-col gap-6">
      <table className="table-auto w-full border border-borderColor rounded-sm text-left">
        <thead className="bg-lightBgHover border-b border-borderColorHover uppercase text-textColor2">
          <tr>
            {listTitle &&
              listTitle.map((item, index) => (
                <th key={index} className="p-4 font-medium">
                  {item}
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((data, index) => (
              <tr
                key={index}
                className="hover:bg-lightBgHover border-b border-borderColor text-textColor3"
              >
                <td className="p-4 text-sm font-light">
                  {new Date(data.createdAt).toLocaleDateString()}
                </td>

                <td className="p-4 text-base font-light">{data.fullname}</td>

                <td className="p-4 text-base font-medium">
                  <p
                    className="w-fit line-clamp-2 cursor-pointer hover:underline"
                    onClick={() => onClickMessageItem(data._id)}
                  >
                    {data.message}
                  </p>
                </td>

                <td className="p-4 text-base font-light">
                  <p className="w-fit line-clamp-1">{data.email}</p>
                </td>

                <td className="p-4 text-base font-light">
                  <p className="w-fit">{data.contact}</p>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* Show more button */}
      {showMore && (
        <div className="text-center">
          <Button
            type={"button"}
            text={"Show More"}
            className={"border border-bgDark hover:bg-lightBgHover"}
            handleClick={showMoreClick}
          />
        </div>
      )}
    </div>
  );
};

export default MessageListItem;
