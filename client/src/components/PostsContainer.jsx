import React, { useEffect, useState } from "react";
import Title from "./Title";
import PostCard from "./PostCard";
import { posts } from "../assets/assets";

const PostsContainer = () => {
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    setPostList(posts);
  }, [posts]);

  return (
    <div className="flex flex-col gap-4 text-textColor2 my-24 sm:my-28 md:my-32">
      <Title text1={"Recent"} text2={"Posts"} />

      <p className="text-sm text-center">
        Here, we share different category of articles that inspire your next
        adventures.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 gap-y-6">
        {postList &&
          postList.map((item, index) => (
            <PostCard
              key={index}
              id={item._id}
              title={item.title}
              description={item.description}
              category={item.category}
              image={item.image}
              date={item.date}
              postCreatorProfile={item.postCreatorProfile}
              postCreatorName={item.postCreatorName}
              read={item.read}
            />
          ))}
      </div>
    </div>
  );
};

export default PostsContainer;
