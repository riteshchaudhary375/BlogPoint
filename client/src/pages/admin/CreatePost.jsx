import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

import { assets } from "../../assets/assets";
import Title from "../../components/Title";
import Button from "../../components/Button";
import toast from "react-hot-toast";

const CreatePost = () => {
  const [image, setImage] = useState(false);
  const filePickerRef = useRef();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Uncategorized");
  const [content, setContent] = useState("");

  const [publishError, setPublishError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setPublishError(null);

      const formData = new FormData();

      formData.append("title", title);
      formData.append("category", category);
      formData.append("content", content);

      image && formData.append("image", image);

      const res = await fetch(`/api/post/create`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (!res.ok || data.success === false) {
        // toast.error(data.message);
        setPublishError(data.message);
        return;
      }
      if (res.ok) {
        setPublishError(null);
        toast.success(data.message);
        navigate(`/post/${data.savedPost.slug}`);
        /* setTitle("");
        setContent("");
        setImage(false); */
      }
    } catch (error) {
      // toast.error(error.message);
      setPublishError(error.message);
    }
  };

  return (
    <div className="w-full xl:w-[800px]">
      <div className="text-center">
        <Title text1={"Create a"} text2={"Post"} />
      </div>

      <div className="my-8 sm:my-12 md:my-14">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2 lg:grid grid-cols-[3fr_1fr] lg:gap-4">
            <input
              type="text"
              id="title"
              placeholder="Title of the post"
              className="bg-inherit border border-borderColor outline-borderColorHover rounded-sm px-2 py-1"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              required
            />

            <div className="flex justify-end">
              <select
                className="bg-inherit border border-borderColor outline-borderColorHover rounded-sm px-2 py-1 cursor-pointer"
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value={"Uncategorized"}>Select a category</option>
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
                <option value={"Parenting & Family"}>Parenting & Family</option>
                <option value={"Self-Improvement"}>Self-Improvement</option>
                <option value={"Sports & Fitness"}>Sports & Fitness</option>
              </select>
            </div>
          </div>

          <div
            className="w-full h-[200px] border border-borderColor rounded-sm flex items-center justify-center cursor-pointer"
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
                src={image ? URL.createObjectURL(image) : assets.upload_img}
                alt="select_img"
                className={`object-cover object-center ${
                  image ? "w-full h-full" : "w-16 h-16"
                }`}
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
            onChange={setContent}
            value={content}
            required
          />

          <div className="w-full text-center mt-16">
            <Button
              type={"submit"}
              text={"Publish"}
              className={
                "text-textLight bg-bgDark border-none outline-none hover:bg-opacity-[93%]"
              }
            />
          </div>
        </form>

        {publishError && <p className="text-red-600 mt-6">{publishError}</p>}
      </div>
    </div>
  );
};

export default CreatePost;
