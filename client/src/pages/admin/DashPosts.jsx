import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";

import PostListItem from "../../components/admin/PostListItem";
import LoaderSpinner from "../../components/LoaderSpinner";
import Notification from "../../components/Notification";
import Modal from "../../components/Modal";

const DashPosts = ({ showModal, setShowModal }) => {
  const postListTitle = [
    "post_image",
    "post_title",
    "category",
    "created_at",
    "updated_at",
    "actions",
  ];

  const { currentUser } = useSelector((state) => state.user);
  const [posts, setPosts] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [fetching, setFetching] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState("");
  const [postIdToEdit, setPostIdToEdit] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setFetching(true);
        const res = await fetch(`/api/post/get?userId=${currentUser._id}`);
        const data = await res.json();
        if (!res.ok) {
          setFetching(false);
          toast.error(data.message);
          setFetching(false);
          return;
        }
        if (res.ok) {
          setPosts(data.posts);
          if (data.posts.length < 9) {
            setShowMore(false);
          }
          setFetching(false);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message);
        setFetching(false);
      }
    };

    if (currentUser.isAdmin) {
      fetchPosts();
    }
  }, [currentUser._id]);

  /* useEffect(() => {
    const fetchPosts = async () => {
      try {
        setFetching(true);
        const res = await fetch(`/api/post/getAllPostsForAdmin`);
        const data = await res.json();
        if (!res.ok) {
          setFetching(false);
          toast.error(data.message);
          setFetching(false);
          return;
        }
        if (res.ok) {
          setPosts(data.posts);
          if (data.posts.length < 9) {
            setShowMore(false);
          }
          setFetching(false);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message);
        setFetching(false);
      }
    };

    if (currentUser.isAdmin) {
      fetchPosts();
    }
  }, [currentUser._id]); */

  const handleShowMore = async () => {
    const startIndex = posts.length;
    try {
      const res = await fetch(
        `/api/post/get?userId=${currentUser._id}&startIndex=${startIndex}`
      );
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message);
        return;
      }
      if (res.ok) {
        setPosts((prevPosts) => [...prevPosts, ...data.posts]);
        if (data.posts.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const handleDeletePost = async () => {
    try {
      const res = await fetch(
        `/api/post/delete/${postIdToDelete}/${currentUser._id}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (!res.ok) {
        setShowModal(false);
        toast.error(data.message);
        return;
      } else {
        setShowModal(false);
        setPosts((prev) => prev.filter((post) => post._id !== postIdToDelete));
        toast.success(data.message);
      }
    } catch (error) {
      setShowModal(false);
      toast.error(error.message);
    }
  };

  return (
    <>
      {fetching && <LoaderSpinner />}

      {!fetching &&
        currentUser &&
        currentUser.isAdmin &&
        posts.length === 0 && <Notification text={"Post Not Found!"} />}

      {!fetching && currentUser && currentUser.isAdmin && posts.length > 0 && (
        <PostListItem
          listTitle={postListTitle}
          data={posts}
          showMore={showMore}
          showMoreClick={handleShowMore}
          idToDelete={setPostIdToDelete}
          idToEdit={setPostIdToEdit}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}

      {/* Delete Modal Popup */}
      {showModal && (
        <Modal
          text={"Are you sure you want to delete this post?"}
          setShowModal={setShowModal}
          onDeleteUser={handleDeletePost}
        />
      )}
    </>
  );
};

export default DashPosts;
