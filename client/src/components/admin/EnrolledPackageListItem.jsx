import React from "react";

import Button from "../Button";

const EnrolledPackageListItem = ({
  listTitle,
  data,
  showMore,
  showMoreClick,
  showModal,
  setEnrolledPackageIdDelete,
  setShowModal,
}) => {
  // console.log(data);

  return (
    <div className="flex flex-col gap-6">
      <table className="table-auto w-full border border-borderColor rounded-sm text-left">
        <thead className="bg-lightBgHover border-b border-borderColorHover uppercase text-textColor2">
          <tr>
            {listTitle &&
              listTitle.map((item, index) => (
                <th key={index} className="p-4 font-medium whitespace-nowrap">
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
                title="Click message content to view full"
                className="hover:bg-lightBgHover border-b border-borderColor text-textColor3"
              >
                <td className="p-4 text-base font-extralight">
                  <p className="w-fit line-clamp-1">{data._id}</p>
                </td>

                <td className="p-4 text-base font-medium">
                  <p className="w-fit line-clamp-1 capitalize border border-borderColor px-1 py-0.5 rounded-sm text-blue-500">
                    {data.subscribedPlan}
                  </p>
                </td>

                <td className="p-4 text-base font-light">
                  <p className="w-fit line-clamp-1 capitalize">
                    1 {data.duration}
                  </p>
                </td>

                <td className="p-4 text-sm font-light">
                  {new Date(data.createdDate).toLocaleDateString()}
                </td>

                <td className="p-4 text-base font-medium text-blue-500">
                  <p className="w-fit line-clamp-1 capitalize">
                    {data.paymentMethod}
                  </p>
                </td>

                <td className="p-4 text-base font-light">
                  <p className="w-fit line-clamp-1 capitalize">
                    $ {data.amount}
                  </p>
                </td>

                <td className="p-4 text-sm font-light">
                  {new Date(data.paymentTime).toLocaleDateString()}
                </td>

                <td className="p-4 text-sm font-light">
                  {new Date(data.nextBilling).toLocaleDateString()}
                </td>

                {/* User details */}
                <td className="p-4 text-base font-extralight">
                  <p className="w-fit line-clamp-1">{data.userData._id}</p>
                </td>

                <td className="p-4 text-base font-extralight">
                  <p className="w-fit line-clamp-1">{data.userData.username}</p>
                </td>

                <td className="p-4 text-base font-extralight">
                  <img
                    src={data.userData.profilePicture}
                    alt={data.userData.username}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                </td>

                <td className="p-4 text-base font-extralight">
                  <p className="w-fit line-clamp-1">{data.userData.email}</p>
                </td>

                <td className="p-4 text-base font-extralight">
                  <p className="w-fit line-clamp-1 border border-borderColor px-1 rounded-sm">
                    {data.userData.role}
                  </p>
                </td>

                <td className="p-4 text-base font-light">
                  <p
                    className="w-fit text-red-600 hover:underline cursor-pointer"
                    onClick={() => {
                      setEnrolledPackageIdDelete(data._id);
                      setShowModal(true);
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

export default EnrolledPackageListItem;
