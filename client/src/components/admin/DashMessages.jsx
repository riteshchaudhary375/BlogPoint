import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";

import LoaderSpinner from "../../components/LoaderSpinner";
import Notification from "../../components/Notification";
import MessageListItem from "./MessageListItem";
import Modal from "../../components/Modal";
import MessageModal from "../MessageModal";

const DashMessages = ({
  showModal,
  setShowModal,
  showMessageModal,
  setShowMessageModal,
}) => {
  const { currentUser } = useSelector((state) => state.user);
  const [messages, setMessages] = useState([]);
  //   console.log(messages);

  const messageListTitle = [
    "date_created",
    "full_name",
    "message",
    "email",
    "contact",
  ];

  const [fetching, setFetching] = useState(false);
  const [showMore, setShowMore] = useState(true);
  const [userIdToDelete, setUserIdToDelete] = useState("");

  //   const [showMessageModal, setShowMessageModal] = useState(false);
  const [messageItemData, setMessageItemData] = useState({});
  //   console.log(messageItemData);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchMessages = async () => {
      try {
        setFetching(true);

        const res = await fetch(`/api/message/getMessages`, {
          signal,
        });
        const data = await res.json();
        // console.log(data);

        if (res.ok) {
          setMessages(data.messages);
          if (data.messages.length < 9) {
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
      fetchMessages();
    }

    // Aborting useEffect for unnecessary fetch
    return () => {
      console.log("Cleaning up useEffect of fetching message list.");
      controller.abort();
    };
  }, [currentUser._id]);

  // Handle show more message
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

  // Handle delete message
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

  //   Handle click message item
  const handleClickMessageItem = async (messageId) => {
    setShowMessageModal(true);
    const messageItem =
      messages && messages.filter((item) => item._id === messageId);
    setMessageItemData(messageItem[0]);
  };

  return (
    <>
      {fetching && <LoaderSpinner />}

      {!fetching &&
        currentUser &&
        currentUser.isAdmin &&
        messages.length === 0 && <Notification text={"Message Not Found!"} />}

      {!fetching &&
        currentUser &&
        currentUser.isAdmin &&
        messages.length > 0 && (
          <MessageListItem
            listTitle={messageListTitle}
            data={messages}
            showMore={showMore}
            showMoreClick={handleShowMore}
            showModal={showModal}
            setShowModal={setShowModal}
            idToDelete={setUserIdToDelete}
            onClickMessageItem={handleClickMessageItem}
          />
        )}

      {/* Delete Modal Popup */}
      {showModal && (
        <Modal
          text={"Are you sure you want to delete this message?"}
          setShowModal={setShowModal}
          onDeleteUser={handleDeleteUser}
        />
      )}

      {/* Message Modal */}
      {showMessageModal && (
        // <div className="fixed top-20 left-0 right-0 overflow-scroll">
        <MessageModal
          setShowMessageModal={setShowMessageModal}
          messageItemData={messageItemData}
        />
        // </div>
      )}
    </>
  );
};

export default DashMessages;
