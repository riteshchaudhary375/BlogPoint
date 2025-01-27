import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";

import LoaderSpinner from "../LoaderSpinner";
import Notification from "../Notification";
import SubscriberListItem from "./SubscriberListItem";
import Modal from "../Modal";

const DashSubscribers = ({ showModal, setShowModal }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [subscribers, setSubscribers] = useState([]);

  const messageListTitle = ["date_created", "email", "action"];

  const [fetching, setFetching] = useState(false);
  const [showMore, setShowMore] = useState(true);

  const [subscriberIdToDelete, setSubscriberIdToDelete] = useState("");

  // Fetch all subscribers
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchSubscribers = async () => {
      try {
        setFetching(true);
        const res = await fetch(`/api/subscriber/getSubscribers`, {
          signal,
        });
        const data = await res.json();
        // console.log(data);

        if (res.ok) {
          setSubscribers(data.subscribers);
          if (data.subscribers.length < 9) {
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
      fetchSubscribers();
    }

    // Aborting useEffect for unnecessary fetch
    return () => {
      console.log("Cleaning up useEffect of fetching subscribers list.");
      controller.abort();
    };
  }, [currentUser._id]);

  // Handle show more subscribers
  const handleShowMore = async () => {
    const startIndex = subscribers.length;

    try {
      const res = await fetch(
        `/api/subscriber/getSubscribers?startIndex=${startIndex}`
      );
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message);
        return;
      }
      if (res.ok) {
        setSubscribers((prev) => [...prev, ...data.subscribers]);
        if (data.subscribers.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Handle delete subscribers
  const handleDeleteSubscriber = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `/api/subscriber/deleteSubscriber/${subscriberIdToDelete}`,
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
        setSubscribers((prev) =>
          prev.filter((subscriber) => subscriber._id !== subscriberIdToDelete)
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
        subscribers.length === 0 && (
          <Notification text={"Subscriber Not Found!"} />
        )}

      {!fetching &&
        currentUser &&
        currentUser.isAdmin &&
        subscribers.length > 0 && (
          <SubscriberListItem
            listTitle={messageListTitle}
            data={subscribers}
            showMore={showMore}
            showMoreClick={handleShowMore}
            showModal={showModal}
            setShowModal={setShowModal}
            setSubscriberIdToDelete={setSubscriberIdToDelete}
          />
        )}

      {/* Delete Modal Popup */}
      {showModal && (
        <Modal
          text={"Are you sure you want to delete this subscriber?"}
          setShowModal={setShowModal}
          onDeleteUser={handleDeleteSubscriber}
        />
      )}
    </>
  );
};

export default DashSubscribers;
