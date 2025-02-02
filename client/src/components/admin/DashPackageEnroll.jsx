import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";

import EnrolledPackageListItem from "./EnrolledPackageListItem";
import LoaderSpinner from "../LoaderSpinner";
import Notification from "../Notification";
import Modal from "../Modal";

const DashPackageEnroll = ({ showModal, setShowModal }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [enrolledPackage, setEnrolledPackage] = useState([]);

  const packageEnrolledTitle = [
    "Subscribed_Plan_ID",
    "Subscribed_Plan",
    "Duration",
    "Created_Date",
    "Payment Method",
    "Paid_Amount",
    "Payment_Time",
    "Next_Billing",
    "User_ID",
    "Username",
    "Profile",
    "Email",
    "Role",
    "action",
  ];

  const [fetching, setFetching] = useState(false);
  const [showMore, setShowMore] = useState(true);

  const [enrolledPackageIdDelete, setEnrolledPackageIdDelete] = useState("");

  // Fetch all subscribers
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchEnrolledPackage = async () => {
      try {
        setFetching(true);
        const res = await fetch(`/api/subscriptionPackage/getPackageEnrolled`, {
          signal,
        });
        const data = await res.json();
        // console.log(data);

        if (res.ok) {
          setEnrolledPackage(data.enrolledPackages);
          if (data.enrolledPackages.length < 9) {
            setShowMore(false);
          }
          setFetching(false);
        } else {
          setFetching(false);
        }
      } catch (error) {
        setFetching(false);
        // toast.error(error.message);
        console.log(error.message);
      }
    };

    if (currentUser.isAdmin) {
      fetchEnrolledPackage();
    }

    // Aborting useEffect for unnecessary fetch
    return () => {
      console.log("Cleaning up useEffect of fetching enrolled package list.");
      controller.abort();
    };
  }, [currentUser._id]);

  // Handle show more subscribers
  const handleShowMore = async () => {
    const startIndex = subscribers.length;

    try {
      const res = await fetch(
        `/api/subscriptionPackage/getPackageEnrolled?startIndex=${startIndex}`
      );
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message);
        return;
      }
      if (res.ok) {
        setEnrolledPackage((prev) => [...prev, ...data.enrolledPackages]);
        if (data.enrolledPackages.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Handle delete package enrolled
  const handleDeletePackageEnrolled = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `/api/subscriptionPackage/deletePackageEnrolled/${enrolledPackageIdDelete}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message);
        return;
      }
      if (res.ok) {
        setEnrolledPackage((prev) =>
          prev.filter(
            (packageEnrol) => packageEnrol._id !== enrolledPackageIdDelete
          )
        );
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  return (
    <>
      {fetching && <LoaderSpinner />}

      {!fetching &&
        currentUser &&
        currentUser.isAdmin &&
        enrolledPackage.length === 0 && (
          <Notification text={"Enrolled package list Not Found!"} />
        )}

      {!fetching &&
        currentUser &&
        currentUser.isAdmin &&
        enrolledPackage.length > 0 && (
          <EnrolledPackageListItem
            listTitle={packageEnrolledTitle}
            data={enrolledPackage}
            showMore={showMore}
            showMoreClick={handleShowMore}
            showModal={showModal}
            setShowModal={setShowModal}
            setEnrolledPackageIdDelete={setEnrolledPackageIdDelete}
          />
        )}

      {/* Delete Modal Popup */}
      {showModal && (
        <Modal
          text={"Are you sure you want to delete this enrolled detail?"}
          setShowModal={setShowModal}
          onDeleteUser={handleDeletePackageEnrolled}
        />
      )}
    </>
  );
};

export default DashPackageEnroll;
