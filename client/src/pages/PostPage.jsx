import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { posts } from "../assets/assets";
import Badge from "../components/Badge";
import RelatedPosts from "../components/RelatedPosts";

const PostPage = () => {
  const { postId } = useParams();
  const [postData, setPostData] = useState(false);

  const fetchPostData = async () => {
    posts.map((item) => {
      if (item._id === postId) {
        setPostData(item);
        // console.log(item);
        return null;
      }
    });
  };

  useEffect(() => {
    fetchPostData();
  }, [postId, posts]);

  return (
    <>
      {!postData ? (
        <div>
          <p>Loading...</p>
        </div>
      ) : (
        <div className="pt-2 sm:pt-6 md:pt-8">
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-textColor1 text-2xl md:text-3xl text-center font-medium">
                {postData.title}
              </h1>
            </div>

            <div className="flex flex-col gap-2 text-textColor3">
              <img
                src={postData.image}
                alt="Post image"
                className="w-full h-[230px] sm:h-[250px] md:h-[300px] lg:h-[330px] xl:h-[350px] object-cover rounded-sm"
              />
              <div className="flex items-center justify-between px-2">
                {/* Created Date & read time */}
                <div className="flex items-center gap-1 text-xs md:text-sm font-medium">
                  <p className="text-textColor2">{postData.date}</p>
                  <span className="text-xl">•</span>
                  <p className="text-xs">{postData.read}</p>
                </div>

                {/* Category */}
                <p className="text-textColor2">
                  <Badge
                    badgeTitle={postData.category}
                    textSize={"sm"}
                    paddingX={"2"}
                    paddingY={"1"}
                  />
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1">
                <img
                  src={postData.postCreatorProfile}
                  alt="Creater profile"
                  className="w-6 h-6 rounded-full object-cover"
                />

                <p className="font-medium text-sm text-textColor1 underline">
                  {postData.postCreatorName}:
                </p>
              </div>

              <div>
                <p className="text-base text-textColor2">
                  {postData.description}
                </p>
              </div>
            </div>
          </div>

          {/* Related posts */}
          <RelatedPosts category={postData.category} />
        </div>
      )}
    </>
  );
};

export default PostPage;
