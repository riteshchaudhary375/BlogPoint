import React, { useEffect, useState } from "react";

// import { posts } from "../assets/assets";
import Title2 from "./Title2";
import RelatedPostCard from "./RelatedPostCard";
import Button from "./Button";
import toast from "react-hot-toast";

const RelatedPosts = ({ category }) => {
  const [relatedPosts, setRelatedPosts] = useState([]);
  // console.log(relatedPosts);

  useEffect(() => {
    /* if (posts.length > 0) {
      let postsCopy = posts.slice();

      postsCopy = postsCopy.filter((item) => category === item.category);
      setRelatedPosts(postsCopy.slice(0, 4));
    } */

    const fetchRelatedPosts = async () => {
      try {
        const res = await fetch(`/api/post/get?category=${category}`);
        const data = await res.json();
        if (!res.ok) {
          toast.error(data.message);
          return;
        }
        if (res.ok) {
          setRelatedPosts(data.posts);
        }
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchRelatedPosts();
  }, [category]);

  return (
    <div className="my-20 md:my-24 w-full overflow-scroll">
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
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 gap-y-6"> */}
      <div className="flex flex-row gap-4 w-full overflow-x-scroll">
        {relatedPosts.slice(0, 5).map((item, index) => (
          <div className="w-[320px]" key={index}>
            <RelatedPostCard
              postId={item._id}
              postSlug={item.slug}
              title={item.title}
              content={item.content}
              category={item.category}
              image={item.image}
              date={
                item.updateDate === null ? item.createdDate : item.updateDate
              }
              postCreatorData={item.userData}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedPosts;
