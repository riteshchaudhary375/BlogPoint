import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";

import LoaderSpinner from "../../components/LoaderSpinner";
import Notification from "../../components/Notification";
import Modal from "../../components/Modal";
import CommentListItem from "./CommentListItem";

const DashComments = ({ showModal, setShowModal }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);
  // console.log(users);

  const commentListTitle = [
    "date_updated",
    "comment_content",
    "number_of_likes",
    "post_id",
    "user_id",
    "action",
  ];

  const [fetching, setFetching] = useState(false);
  const [showMore, setShowMore] = useState(true);
  const [commentIdToDelete, setCommentIdToDelete] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchComments = async () => {
      try {
        setFetching(true);

        const res = await fetch(`/api/comment/getComments`, { signal });
        const data = await res.json();
        // console.log(data);

        if (res.ok) {
          setComments(data.comments);
          if (data.comments.length < 9) {
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
      fetchComments();
    }

    // Aborting useEffect for unnecessary fetch
    return () => {
      console.log("Cleaning up useEffect for fetching comments list.");
      controller.abort();
    };
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = comments.length;
    try {
      const res = await fetch(`/api/comment/getComments?startIndex=${startIndex}`);
      const data = await res.json();
      if (!res.ok) {
        // console.log(data.message);
        toast.error(data.message);
        return;
      }
      if (res.ok) {
        setComments((prevState) => [...prevState, ...data.comments]);
        if (data.comments.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      // console.log(error);
      toast.error(error.message);
    }
  };

  const handleDeleteComment = async () => {
    try {
      const res = await fetch(
        `/api/comment/deleteComment/${commentIdToDelete}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (!res.ok) {
        setShowModal(false);
        // console.log(data.message);
        toast.error(data.message);
        return;
      }
      if (res.ok) {
        setShowModal(false);
        setComments((prev) =>
          prev.filter((comment) => comment._id !== commentIdToDelete)
        );
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
        comments.length === 0 && <Notification text={"Comments Not Found!"} />}

      {!fetching &&
        currentUser &&
        currentUser.isAdmin &&
        comments.length > 0 && (
          <CommentListItem
            listTitle={commentListTitle}
            data={comments}
            showMore={showMore}
            showMoreClick={handleShowMore}
            showModal={showModal}
            setShowModal={setShowModal}
            idToDelete={setCommentIdToDelete}
          />
        )}

      {/* Delete Modal Popup */}
      {showModal && (
        <Modal
          text={"Are you sure you want to delete this comment?"}
          setShowModal={setShowModal}
          onDeleteUser={handleDeleteComment}
        />
      )}
    </>
  );
};

export default DashComments;
