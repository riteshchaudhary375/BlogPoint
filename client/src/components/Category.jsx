import React from "react";
import { Link } from "react-router-dom";
import Title from "./Title";
import { categoryData } from "../assets/assets";

const Category = () => {
  return (
    <div className="flex flex-col items-center gap-6 py-16 text-textColor2">
      <div className="text-center text-2xl pt-8">
        <Title text1={"Find by"} text2={"Category"} />
      </div>
      {/* <p className="">Immerse yourself in the excellence of your top article.</p> */}
      <p className="text-sm text-center sm:w-3/5">
        Choose the article that resonates most with your interests or needs, and
        take the time to immerse yourself in its insights. Let it inspire,
        inform, or entertain you, adding value to your day and leaving you with
        a sense of accomplishment or newfound perspective.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-6 pt-7 w-full">
        {categoryData.map((item, index) => (
          <Link
            to={`/blogs/${item.category}`}
            key={index}
            className="flex flex-col items-center"
            onClick={() => scrollTo(0, 0)} // when clicked then it will navigate to next page with 0,0 coordinate i.e., at top of the page
          >
            <img
              src={item.image}
              alt="category"
              className="p-2 w-24 h-24 object-cover object-top bg-no-repeat mb-2  border rounded-full hover:border-textColor3/90 transition-all duration-200 ease-in"
            />
            <p className="text-xs">{item.category}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Category;
