import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

// import { posts } from "../assets/assets";
import Badge from "../components/Badge";
import RelatedPosts from "../components/RelatedPosts";
import LoaderSpinner from "../components/LoaderSpinner";

const PostPage = () => {
  const { postSlug } = useParams();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [postData, setPostData] = useState(null);
  // console.log("Post Data", postData);
  const [postDataID, setPostDataID] = useState(null);

  const [postCreatorProfile, setPostCreatorProfile] = useState({});
  // console.log("Creator Profile Data", postCreatorProfile);

  const getCreatorProfile = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/post/getSlugPost/${postData._id}`);
      const data = await res.json();
      // console.log("Creator Data", data);
      if (!res.ok) {
        setError(true);
        setLoading(false);
        return;
      }
      if (res.ok) {
        setPostCreatorProfile(data);
        setLoading(false);
      }
    } catch (error) {
      // toast.error(error.message);
      setLoading(false);
    }
  };

  const fetchPostData = async () => {
    /* posts.map((item) => {
      if (item._id === postId) {
        setPostData(item);
        // console.log(item);
        return null;
      }
    }); */
    try {
      setError(false);
      setLoading(true);

      const res = await fetch(`/api/post/get?slug=${postSlug}`);
      const data = await res.json();
      if (!res.ok) {
        setError(true);
        setLoading(false);
        return;
      }
      if (res.ok) {
        setPostData(data.posts[0]);
        setPostDataID(data.posts[0]._id);
        setLoading(false);
        setError(false);
      }
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPostData();
    getCreatorProfile();
  }, [postSlug, postDataID]);

  if (loading)
    return (
      <div className="w-full min-h-screen">
        <div className="pt-2 sm:pt-6 md:pt-8">
          <LoaderSpinner />
        </div>
      </div>
    );

  return (
    <div className="w-full min-h-screen">
      <div className="pt-2 sm:pt-6 md:pt-8">
        <div className="w-full lg:w-[800px] mx-auto">
          {postData && (
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
                    alt={postData.title}
                    className="w-full h-[230px] sm:h-[250px] md:h-[300px] lg:h-[330px] xl:h-[350px] object-cover object-center rounded-sm"
                  />

                  <div className="flex flex-col px-2">
                    <div className="flex items-center justify-between">
                      {/* Created Date & read time */}
                      <div className="flex items-center gap-1 text-xs md:text-sm font-medium">
                        <p className="text-textColor2">
                          {new Date(postData.createdAt).toLocaleString()}
                        </p>
                        <span className="text-xl">•</span>
                        <p className="text-xs">
                          {(postData.content.length / 1000).toFixed(0)}{" "}
                          {(postData.content.length / 1000).toFixed(0) > 0
                            ? "mins"
                            : "min"}{" "}
                          read
                        </p>
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

                    {postData.updateDate === null ? (
                      <div className="opacity-0"></div>
                    ) : (
                      <p className="text-xs text-textColor3">
                        <span className="underline">Updated:</span>{" "}
                        <span className="text-textColor2 font-medium">
                          {new Date(postData.updateDate).toLocaleString()}
                        </span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  {/* Creator Profile */}
                  {postCreatorProfile && (
                    <div className="flex items-end gap-1">
                      <img
                        src={postCreatorProfile.profilePicture}
                        // src={postCreatorImage}
                        alt="Creater profile"
                        className="w-6 h-6 rounded-full object-cover"
                      />

                      <p className="font-medium text-sm text-textColor1 underline">
                        {postCreatorProfile.username}:
                      </p>
                    </div>
                  )}

                  {/* Post Content */}
                  <div
                    className="post-content" // 'post-content' is a custom css written in 'index.css'
                    dangerouslySetInnerHTML={{
                      __html: postData && postData.content,
                    }}
                  >
                    {/*  <p className="text-base text-textColor2">
                      {postData.content}
                    </p> */}
                  </div>
                </div>
              </div>

              {/* Related posts */}
              <RelatedPosts category={postData.category} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostPage;
