import React from "react";
import { assets } from "../../assets/assets";
import Button from "../Button";

const ListItem = ({
  listTitle,
  data,
  showMore,
  showMoreClick,
  showModal,
  setShowModal,
  idToDelete,
}) => {
  // console.log(users);

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
                <td className="p-4 text-base font-light">
                  <img
                    src={data.profilePicture}
                    alt="user_image"
                    className="w-8 h-8 rounded-full object-cover object-center inline-block"
                  />
                </td>
                <td className="p-4 text-base font-medium">{data.username}</td>
                <td className="p-4 text-base font-light">{data.email}</td>
                <td className="p-4 text-base font-light">
                  {data.isAdmin ? (
                    <img
                      src={assets.checkmark}
                      alt="admin_user"
                      className="w-6 h-6 object-cover object-center"
                    />
                  ) : (
                    <img
                      src={assets.crossmark}
                      alt="not_admin_user"
                      className="w-4 h-4 object-cover object-center"
                    />
                  )}
                </td>
                <td className="p-4 text-base font-light">
                  {/* <p
                    className={`w-fit text-red-500 hover:underline cursor-pointer`}
                    onClick={() => {
                      setShowModal(true);
                      idToDelete(data._id);
                    }}
                  >
                    Delete
                  </p> */}
                  <button
                    disabled={data.username === "admin"}
                    title={
                      data.username === "admin" ? "Not Allowed" : undefined
                    }
                    className={
                      data.username === "admin"
                        ? "text-red-900"
                        : "text-red-600 hover:underline"
                    }
                    onClick={() => {
                      setShowModal(true);
                      idToDelete(data._id);
                    }}
                  >
                    Delete
                  </button>
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

export default ListItem;
