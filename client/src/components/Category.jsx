import React from "react";
import { useNavigate } from "react-router-dom";

import Title from "./Title";
// import { categoryData } from "../assets/assets";
import { categoryAssets } from "../assets/assets";

const Category = () => {
  const categoryData = [
    {
      category: "Technology",
      image: categoryAssets.cpu,
    },
    {
      category: "Health",
      image: categoryAssets.health,
    },
    {
      category: "Finance",
      image: categoryAssets.finance,
    },
    {
      category: "Travel",
      image: categoryAssets.travel,
    },
    {
      category: "Lifestyle",
      image: categoryAssets.lifestyle,
    },
    {
      category: "Food",
      image: categoryAssets.food,
    },
    {
      category: "Education",
      image: categoryAssets.education,
    },
    {
      category: "Business & Entrepreneurship",
      image: categoryAssets.handshake,
    },
    {
      category: "Entertainment",
      image: categoryAssets.entertainment,
    },
    {
      category: "Parenting & Family",
      image: categoryAssets.family,
    },
    {
      category: "Self-Improvement",
      image: categoryAssets.self_improvement,
    },
    {
      category: "Sports & Fitness",
      image: categoryAssets.sport_fitness,
    },
  ];

  const navigate = useNavigate();

  const filterByCategory = async (cat) => {
    try {
      navigate(`/blogs?searchTerm=&sort=desc&category=${cat}`);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="container flex flex-col items-center gap-4 text-textColor2 my-16 sm:my-20 md:my-24">
      <Title text1={"Find by"} text2={"Category"} />

      {/* <p className="">Immerse yourself in the excellence of your top article.</p> */}
      <p className="text-sm text-center sm:w-3/5">
        Choose the article that resonates most with your interests or needs, and
        take the time to immerse yourself in its insights. Let it inspire,
        inform, or entertain you, adding value to your day and leaving you with
        a sense of accomplishment or newfound perspective.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8 pt-7 w-full">
        {categoryData &&
          categoryData.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center group cursor-pointer"
              onClick={() => filterByCategory(item.category)}
            >
              <img
                src={item.image}
                alt="category"
                className="p-2 w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 object-cover bg-no-repeat mb-2 border border-borderColor group-hover:border-borderColorHover rounded-full transition-all duration-200 ease-in"
              />
              <p className="text-xs md:text-sm">{item.category}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Category;
