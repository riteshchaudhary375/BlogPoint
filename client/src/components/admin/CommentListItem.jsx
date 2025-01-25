import React, { useState } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

import { assets } from "../../assets/assets";
import Button from "../Button";

const CommentListItem = ({
  listTitle,
  data,
  showMore,
  showMoreClick,
  showModal,
  setShowModal,
  idToDelete,
}) => {
  // console.log(data);

  const { currentUser } = useSelector((state) => state.user);

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
                  {new Date(data.updatedAt).toLocaleDateString()}
                </td>

                <td className="p-4 text-base font-light">{data.content}</td>

                <td className="p-4 text-base font-medium">
                  {data.numberOfLikes}
                </td>

                <td className="p-4 text-base font-light">
                  <p className="w-fit line-clamp-1">{data.postId}</p>
                </td>

                <td className="p-4 text-base font-light">
                  <p className="w-fit line-clamp-1">{data.userId}</p>
                </td>

                <td className="p-4 text-base font-light">
                  <p
                    className={`w-fit text-red-500 hover:underline cursor-pointer`}
                    onClick={() => {
                      setShowModal(true);
                      idToDelete(data._id);
                    }}
                  >
                    Delete
                  </p>
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

export default CommentListItem;
