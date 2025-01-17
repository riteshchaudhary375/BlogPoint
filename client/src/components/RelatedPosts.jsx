import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { posts } from "../assets/assets";
import Title2 from "./Title2";
import PostCard from "./PostCard";
import Button from "./Button";

const RelatedPosts = ({ category }) => {
  const [relatedPosts, setRelatedPosts] = useState([]);
  // console.log(relatedPosts);
  const navigate = useNavigate();

  useEffect(() => {
    if (posts.length > 0) {
      let postsCopy = posts.slice();

      postsCopy = postsCopy.filter((item) => category === item.category);
      setRelatedPosts(postsCopy.slice(0, 4));
    }
  }, [posts]);

  return (
    <div className="my-20 md:my-24">
      <div className="flex items-center justify-between">
        <Title2 text1={"Related"} text2={"Articles"} />

        <div className="text-xs">
          <Button
            type={"button"}
            text={"View All"}
            className={"border border-bgDark hover:bg-lightBgHover"}
            handleClick={() => navigate("/blogs")}
          />
        </div>
      </div>

      {/* Post card */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 gap-y-6">
        {relatedPosts.slice(0, 3).map((item, index) => (
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

export default RelatedPosts;
