import React, { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Button from "../../components/Button";
import toast from "react-hot-toast";
import Title from "../../components/Title";

const UpdatePost = () => {
  const [image, setImage] = useState(false);
  const filePickerRef = useRef();

  /* const [title, setTitle] = useState("");
  const [category, setCategory] = useState("uncategorized");
  const [content, setContent] = useState(""); */

  const [publishError, setPublishError] = useState(null);

  const { currentUser, loading } = useSelector((state) => state.user);

  const [postData, setPostData] = useState({});
  const [postTitle, setPostTitle] = useState("");
  const [postCategory, setPostCategory] = useState("Uncategorized");
  const [postImage, setPostImage] = useState(null);
  // console.log(postData);

  const { postId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      setPublishError(null);
      const fetchPost = async () => {
        const res = await fetch(`/api/post/get?postId=${postId}`);
        const data = await res.json();
        if (!res.ok) {
          setPublishError(data.message);
          return;
        }
        if (res.ok) {
          setPublishError(null);
          setPostData(data.posts[0]);
          setPostTitle(data.posts[0].title);
          setPostImage(data.posts[0].image);
        }
      };
      fetchPost();
    } catch (error) {
      setPublishError(error.message);
    }
  }, [postId]);

  /* const handleChange = (e) => {
    setPostData({ ...postData, [e.target.id]: e.target.value });
  }; */

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      let formData = new FormData();

      formData.append("title", postTitle);
      formData.append("category", postData.category);
      formData.append("content", postData.content);

      image && formData.append("image", image);

      const res = await fetch(`/api/post/update/${postId}/${currentUser._id}`, {
        method: "PUT",
        body: formData,
      });
      const data = await res.json();
      // console.log(data);

      if (!res.ok || data.success === false) {
        // toast.error(data.message);
        setPublishError(data.message);
        return;
      }
      if (res.ok) {
        toast.success(data.message);
        // navigate("/dashboard?tab=posts");
        navigate(`/post/${data.updatedPost.slug}`);
      }
    } catch (error) {
      // toast.error(error.message);
      setPublishError(error.message);
    }
  };

  return (
    <div className="container pt-2 sm:pt-6 md:pt-8">
      <div className="w-full lg:w-[920px] mx-auto">
        <div className="text-center">
          <Title text1={"Update a"} text2={"Post"} />
        </div>

        <div className="my-8 sm:my-12 md:my-14">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2 lg:grid grid-cols-[3fr_1fr] lg:gap-4">
              <input
                type="text"
                placeholder="Title of the post"
                id="title"
                className="bg-inherit border border-borderColor outline-borderColorHover rounded-sm px-2 py-1"
                // onChange={handleChange}
                // defaultValue={postTitle}
                // value={postData.title}
                /* onChange={(e) =>
                  setPostData({ ...postData, title: e.target.value })
                  } */
                value={postTitle}
                onChange={(e) => setPostTitle(e.target.value)}
              />

              <div className="flex justify-end">
                <select
                  className="bg-inherit border border-borderColor outline-borderColorHover rounded-sm px-2 py-1 cursor-pointer"
                  id="category"
                  value={postData.category}
                  onChange={(e) =>
                    setPostData({
                      ...postData,
                      category: e.target.value,
                    })
                  }
                >
                  <option value={"Uncategorized"}>Select a category</option>
                  {/* <option>Select a category</option> */}
                  <option value={"Technology"}>Technology</option>
                  <option value={"Health"}>Health</option>
                  <option value={"Finance"}>Finance</option>
                  <option value={"Travel"}>Travel</option>
                  <option value={"Lifestyle"}>Lifestyle</option>
                  <option value={"Food"}>Food</option>
                  <option value={"Education"}>Education</option>
                  <option value={"Business & Entrepreneurship"}>
                    Business & Entrepreneurship
                  </option>
                  <option value={"Entertainment"}>Entertainment</option>
                  <option value={"Parenting & Family"}>
                    Parenting & Family
                  </option>
                  <option value={"Self-Improvement"}>Self-Improvement</option>
                  <option value={"Sports & Fitness"}>Sports & Fitness</option>
                </select>
              </div>
            </div>

            <div
              className="w-full h-[250px] lg:h-[320px] border border-borderColor rounded-sm flex items-center justify-center cursor-pointer"
              title="Select Post Image"
              onClick={() => filePickerRef.current.click()}
            >
              <div className="w-full h-full flex items-center justify-center">
                <input
                  type="file"
                  accept="image/*"
                  ref={filePickerRef}
                  onChange={(e) => setImage(e.target.files[0])}
                  hidden
                />

                <img
                  // src={!image ? postData.image : URL.createObjectURL(image)}
                  src={!image ? postImage : URL.createObjectURL(image)}
                  alt="post_img"
                  className={`w-full h-full object-cover object-center`}
                />
              </div>
            </div>

            {/* 
          React Quill for text typing for creating a post:
          ------------------------------------------------
          Link:- https://www.npmjs.com/package/react-quill-new

          npm install react-quill-new --save

          --------------------------------------------------------
          Link:- https://www.npmjs.com/package/react-quill

          npm i react-quill
        */}
            <ReactQuill
              theme="snow"
              placeholder="Write something..."
              className="w-full h-80"
              onChange={(value) => setPostData({ ...postData, content: value })}
              value={postData.content}
              required
            />

            <div className="w-full text-center mt-16">
              <Button
                disabled={loading}
                type={"submit"}
                text={loading ? "Updating..." : "Update"}
                className={
                  "text-textLight bg-bgDark border-none outline-none hover:bg-opacity-[93%]"
                }
              />
            </div>
          </form>

          {publishError && <p className="text-red-600 mt-6">{publishError}</p>}
        </div>
      </div>
    </div>
  );
};

export default UpdatePost;
