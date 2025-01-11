import React from "react";
import { assets } from "../../assets/assets";
import Button from "../Button";

const ListItem = ({ users, showMore, showMoreClick }) => {
  return (
    <div className="flex flex-col gap-6">
      <table className="table-auto w-full border border-borderColor rounded-sm text-left">
        <thead className="bg-borderColor border-b border-borderColorHover uppercase text-textColor2">
          <tr>
            <th className="p-4 font-medium">date_created</th>
            <th className="p-4 font-medium">user_image</th>
            <th className="p-4 font-medium">username</th>
            <th className="p-4 font-medium">email</th>
            <th className="p-4 font-medium">admin</th>
            <th className="p-4 font-medium">delete</th>
          </tr>
        </thead>

        <tbody>
          {users &&
            users.map((user, index) => (
              <tr
                key={index}
                className="hover:bg-lightBgHover border-b border-borderColor text-textColor3"
              >
                <td className="p-4 text-sm font-light">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="p-4 text-base font-light">
                  <img
                    src={user.profilePicture}
                    alt="user_image"
                    className="w-8 h-8 rounded-full object-cover object-center inline-block"
                  />
                </td>
                <td className="p-4 text-base font-medium">{user.username}</td>
                <td className="p-4 text-base font-light">{user.email}</td>
                <td className="p-4 text-base font-light">
                  {user.isAdmin ? (
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
                  <p className="w-fit text-red-500 hover:underline cursor-pointer">
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

export default ListItem;
