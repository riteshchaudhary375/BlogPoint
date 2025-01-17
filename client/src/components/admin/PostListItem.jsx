import React from "react";
import Button from "../Button";
import Badge from "../Badge";
import { Link } from "react-router-dom";

const PostListItem = ({
  listTitle,
  data,
  showMore,
  showMoreClick,
  showModal,
  setShowModal,
  idToDelete,
}) => {
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
                <td className="p-4 text-base font-light">
                  <img
                    src={data.image}
                    alt="post_image"
                    className="w-20 h-10 rounded-sm object-cover object-center inline-block"
                  />
                </td>

                <td className="p-4 text-base font-medium line-clamp-1">
                  {data.title}
                </td>

                <td className="p-4 text-base font-light">
                  <Badge
                    badgeTitle={data.category}
                    textSize={"xs"}
                    paddingX={"1"}
                    paddingY={"0.5"}
                  />
                </td>

                <td className="p-4 text-base font-light">
                  {new Date(data.createdAt).toLocaleDateString()}
                </td>

                <td
                  className={`p-4 text-base font-light ${
                    !data.updateDate ? "text-center" : ""
                  }`}
                >
                  {data.updateDate
                    ? new Date(data.updateDate).toLocaleDateString()
                    : "-"}
                </td>

                <td className="p-4 text-base font-light">
                  <div className="flex items-center justify-center gap-2 text-sm">
                    <Link to={`/update-post/${data._id}`}>
                      <p className="w-fit text-green-600 hover:underline cursor-pointer">
                        Edit
                      </p>
                    </Link>

                    <p
                      className="w-fit text-red-600 hover:underline cursor-pointer"
                      onClick={() => {
                        setShowModal(true);
                        idToDelete(data._id);
                      }}
                    >
                      Delete
                    </p>
                  </div>
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

export default PostListItem;
