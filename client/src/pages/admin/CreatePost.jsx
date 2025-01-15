import React from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

import { assets } from "../../assets/assets";
import Title2 from "../../components/Title2";
import Button from "../../components/Button";

const CreatePost = () => {
  return (
    <div className="w-full lg:w-[800px]">
      <div className="text-center">
        <Title2 text1={"Create a"} text2={"Post"} />
      </div>

      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-2 lg:grid grid-cols-[3fr_1fr] lg:gap-4">
          <input
            type="text"
            id="title"
            placeholder="Title"
            className="bg-inherit border border-borderColor outline-borderColorHover rounded-sm px-2 py-1"
          />
          <div className="flex justify-end">
            <select className="bg-inherit border border-borderColor outline-borderColorHover rounded-sm px-2 py-1">
              <option value={"uncategorized"}>Select a category</option>
              <option value={"technology"}>Technology</option>
              <option value={"health"}>Health</option>
              <option value={"finance"}>Finance</option>
              <option value={"travel"}>Travel</option>
              <option value={"lifestyle"}>Lifestyle</option>
              <option value={"food"}>Food</option>
              <option value={"education"}>Education</option>
              <option value={"businessEntrepreneurship"}>
                Business & Entrepreneurship
              </option>
              <option value={"entertainment"}>Entertainment</option>
              <option value={"parentingFamily"}>Parenting & Family</option>
              <option value={"selfImprovement"}>Self-Improvement</option>
              <option value={"sportsFitness"}>Sports & Fitness</option>
            </select>
          </div>
        </div>

        <div
          className="w-full h-[200px] border border-borderColor rounded-sm flex items-center justify-center cursor-pointer"
          title="Select Post Image"
        >
          <img
            src={assets.upload_img}
            alt="upload_img"
            className="w-16 h-16 object-cover object-center"
          />
        </div>

        {/* 
          React Quill for text typing for creating a post:
          ------------------------------------------------
          Link:- https://www.npmjs.com/package/react-quill-new

          npm install react-quill-new --save
        */}
        <ReactQuill
          theme="snow"
          placeholder="Write something..."
          className="w-full h-80"
          required
        />

        <div className="w-full text-center mt-16">
          <Button
            type={"submit"}
            text={"Publish"}
            className={
              "text-textLight bg-bgDark border-none outline-none hover:bg-opacity-[93%]"
            }
            handleClick={() => alert("Processing...")}
          />
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
