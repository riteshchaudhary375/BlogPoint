import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import LoaderSpinner from "../../components/LoaderSpinner";
import Notification from "../../components/Notification";
import ListItem from "../../components/admin/ListItem";
import Modal from "../../components/Modal";

const DashUsers = ({ showModal, setShowModal }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  // console.log(users);

  const [fetching, setFetching] = useState(false);
  const [showMore, setShowMore] = useState(true);
  const [userIdToDelete, setUserIdToDelete] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setFetching(true);

        const controller = new AbortController();
        const signal = controller.signal;

        const res = await fetch(`/api/user/getUsers`, { signal });
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          if (data.users.length < 9) {
            setShowMore(false);
          }
          setFetching(false);
        } else {
          setFetching(false);
        }

        // Aborting useEffect for unnecessary fetch
        return () => {
          console.log("Cleaning up useEffect.");
          controller.abort();
        };
      } catch (error) {
        setFetching(false);
        toast.error(error.message);
      }
    };

    if (currentUser.isAdmin) {
      fetchUsers();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = users.length;
    try {
      const res = await fetch(`/api/user/getUsers?startIndex=${startIndex}`);
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
        return;
      }
      if (res.ok) {
        setUsers((prevState) => [...prevState, ...data.users]);
        if (data.users.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error);
      // toast.error(error.message);
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
        <ListItem
          users={users}
          showMore={showMore}
          showMoreClick={handleShowMore}
          showModal={showModal}
          setShowModal={setShowModal}
          setUserIdToDelete={setUserIdToDelete}
        />
      )}

      {/* Delete Modal Popup */}
      {showModal && (
        <Modal setShowModal={setShowModal} onDeleteUser={handleDeleteUser} />
      )}
    </>
  );
};

export default DashUsers;
