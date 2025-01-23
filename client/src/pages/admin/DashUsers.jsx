import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";

import LoaderSpinner from "../../components/LoaderSpinner";
import Notification from "../../components/Notification";
import UserListItem from "../../components/admin/UserListItem";
import Modal from "../../components/Modal";

const DashUsers = ({ showModal, setShowModal }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  // console.log(users);

  const userListTitle = [
    "date_created",
    "user_image",
    "username",
    "email",
    "admin",
    "role",
    "action",
  ];

  const [fetching, setFetching] = useState(false);
  const [showMore, setShowMore] = useState(true);
  const [userIdToDelete, setUserIdToDelete] = useState("");

  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchUsers = async () => {
      try {
        setFetching(true);

        const res = await fetch(`/api/user/getUsers`, { signal });
        const data = await res.json();
        // console.log(data);

        if (res.ok) {
          setUsers(data.users);
          if (data.users.length < 9) {
            setShowMore(false);
          }
          setFetching(false);
        } else {
          setFetching(false);
        }
      } catch (error) {
        setFetching(false);
        toast.error(error.message);
      }
    };

    if (currentUser.isAdmin) {
      fetchUsers();
    }

    // Aborting useEffect for unnecessary fetch
    return () => {
      console.log("Cleaning up useEffect of fetching users list.");
      controller.abort();
    };
  }, [currentUser._id, users.role]);

  const handleShowMore = async () => {
    const startIndex = users.length;
    try {
      const res = await fetch(`/api/user/getUsers?startIndex=${startIndex}`);
      const data = await res.json();
      if (!res.ok) {
        // console.log(data.message);
        toast.error(data.message);
        return;
      }
      if (res.ok) {
        setUsers((prevState) => [...prevState, ...data.users]);
        if (data.users.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      // console.log(error);
      toast.error(error.message);
    }
  };

  const handleDeleteUser = async () => {
    try {
      const res = await fetch(`/api/user/deleteUser/${userIdToDelete}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        setShowModal(false);
        // console.log(data.message);
        toast.error(data.message);
        return;
      }
      if (res.ok) {
        setShowModal(false);
        setUsers((prev) => prev.filter((user) => user._id !== userIdToDelete));
        toast.success(data.message);
      }
    } catch (error) {
      setShowModal(false);
      // console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <>
      {fetching && <LoaderSpinner />}

      {!fetching &&
        currentUser &&
        currentUser.isAdmin &&
        users.length === 0 && <Notification text={"User Not Found!"} />}

      {!fetching && currentUser && currentUser.isAdmin && users.length > 0 && (
        <UserListItem
          listTitle={userListTitle}
          data={users}
          showMore={showMore}
          showMoreClick={handleShowMore}
          showModal={showModal}
          setShowModal={setShowModal}
          idToDelete={setUserIdToDelete}
          userRole={userRole}
          setUserRole={setUserRole}
        />
      )}

      {/* Delete Modal Popup */}
      {showModal && (
        <Modal
          text={"Are you sure you want to delete this user?"}
          setShowModal={setShowModal}
          onDeleteUser={handleDeleteUser}
        />
      )}
    </>
  );
};

export default DashUsers;
