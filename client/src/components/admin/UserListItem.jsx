import React, { useState } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

import { assets } from "../../assets/assets";
import Button from "../Button";

const UserListItem = ({
  listTitle,
  data,
  showMore,
  showMoreClick,
  showModal,
  setShowModal,
  idToDelete,
  fetchUsers,
}) => {
  // console.log(data);

  const { currentUser } = useSelector((state) => state.user);

  const handleUserRole = async (e, userRoleId) => {
    try {
      const res = await fetch(
        `/api/user/updateUserRole/${userRoleId}/${currentUser._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ role: e.target.value }),
          // body: JSON.stringify({ role: userRole }),
        }
      );
      const data = await res.json();
      // console.log("data", data);
      // console.log("users", users);

      if (!res.ok) {
        toast.error(data.message);
        // console.log(data.message);
        return;
      }
      if (res.ok) {
        await fetchUsers();
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      // console.log(error);
    }
  };

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

                <td className="p-4 text-base font-light">
                  <p className="w-fit line-clamp-1">{data.email}</p>
                </td>

                <td className="p-4 text-base font-light">
                  <div className=" flex items-center justify-center">
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
                  </div>
                </td>

                <td className="p-4 text-base font-light">
                  {data.isAdmin ? (
                    <select
                      disabled
                      title="Not Allowed"
                      className="border border-borderColor outline-borderColorHover rounded-sm w-[100px] px-1 py-0.5 bg-inherit"
                    >
                      <option value="User">Admin</option>
                    </select>
                  ) : (
                    <select
                      id="role"
                      className="border border-borderColor outline-borderColorHover rounded-sm w-[100px] px-1 py-0.5 cursor-pointer bg-inherit"
                      value={data.role}
                      onChange={(e) => handleUserRole(e, data._id)}
                    >
                      <option value="User">User</option>
                      <option value="Creator">Creator</option>
                    </select>
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

export default UserListItem;
