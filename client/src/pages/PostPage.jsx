import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import {
  EmailShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  FacebookShareButton,
  PinterestShareButton,
  WhatsappShareButton,
  InstapaperShareButton,
  TelegramShareButton,
} from "react-share";
// npm install react-share
// or, npm install react-share --force

// import { posts } from "../assets/assets";
import { socialShareAssets } from "../assets/assets.js";
import Badge from "../components/Badge";
import RelatedPosts from "../components/RelatedPosts";
import LoaderSpinner from "../components/LoaderSpinner";
import CommentSection from "../components/CommentSection.jsx";

const PostPage = () => {
  const { postSlug } = useParams();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [postData, setPostData] = useState(null);
  // console.log("Post Data", postData);
  const [postDataID, setPostDataID] = useState(null);

  const [postCreatorProfile, setPostCreatorProfile] = useState({});
  // console.log("Creator Profile Data", postCreatorProfile);

  // Current page url
  const currentPageUrl = window.location.href;
  // console.log(currentPageUrl);

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
    <main className="container">
      <div className="w-full min-h-screen">
        <div className="pt-2 sm:pt-6 md:pt-8">
          <div className="w-full lg:w-[920px] mx-auto">
            {postData && (
              <>
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

                  <div className="flex flex-col gap-6 my-8">
                    <div className="flex items-center justify-between">
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

                      {/* Share Links */}
                      <div className="flex gap-1.5 items-center justify-center">
                        <EmailShareButton
                          url={currentPageUrl}
                          subject="New article"
                          body="body here"
                          hashtag="#blogpoint"
                        >
                          <img
                            src={
                              socialShareAssets &&
                              socialShareAssets.email_social_icon
                            }
                            alt="email"
                            title="Email Share"
                            className="w-6 h-6 object-cover object-center"
                          />
                        </EmailShareButton>

                        <LinkedinShareButton
                          url={currentPageUrl}
                          /* quote="New article"
                          hashtag="#blogpoint" */
                        >
                          <img
                            src={
                              socialShareAssets &&
                              socialShareAssets.linkedin_social_icon
                            }
                            alt="linkedin"
                            title="Linkedin Share"
                            className="w-6 h-6 object-cover object-center"
                          />
                        </LinkedinShareButton>

                        <TwitterShareButton
                          url={currentPageUrl}
                          title="New article"
                        >
                          <img
                            src={
                              socialShareAssets &&
                              socialShareAssets.twitter_social_icon
                            }
                            alt="twitter"
                            title="Twitter Share"
                            className="w-6 h-6 object-cover object-center"
                          />
                        </TwitterShareButton>

                        <FacebookShareButton
                          url={currentPageUrl}
                          /* quote="New article"
                          hashtag="#blogpoint" */
                        >
                          <img
                            src={
                              socialShareAssets &&
                              socialShareAssets.faceboook_social_icon
                            }
                            alt="facebook"
                            title="Facebook Share"
                            className="w-6 h-6 object-cover object-center"
                          />
                        </FacebookShareButton>

                        <WhatsappShareButton
                          url={currentPageUrl}
                          title={"New Post"}
                          separator=":: "
                        >
                          <img
                            src={
                              socialShareAssets &&
                              socialShareAssets.whatsapp_social_icon
                            }
                            alt="whatsapp"
                            title="Whatsapp Share"
                            className="w-6 h-6 object-cover object-center"
                          />
                        </WhatsappShareButton>

                        <InstapaperShareButton
                          url={currentPageUrl}
                          title={"New Post"}
                        >
                          <img
                            src={
                              socialShareAssets &&
                              socialShareAssets.instagram_social_icon
                            }
                            alt="instagram"
                            title="Instagram Share"
                            className="w-6 h-6 object-cover object-center"
                          />
                        </InstapaperShareButton>

                        <TelegramShareButton
                          url={currentPageUrl}
                          title={"New Post"}
                        >
                          <img
                            src={
                              socialShareAssets &&
                              socialShareAssets.telegram_social_icon
                            }
                            alt="telegram"
                            title="Telegram Share"
                            className="w-6 h-6 object-cover object-center"
                          />
                        </TelegramShareButton>

                        <PinterestShareButton
                          url={String(currentPageUrl)}
                          media={`${String(window.location)}/${postData.image}`}
                        >
                          <img
                            src={
                              socialShareAssets &&
                              socialShareAssets.pinterest_social_icon
                            }
                            alt="pinterest"
                            title="Pinterest Share"
                            className="w-6 h-6 object-cover object-center"
                          />
                        </PinterestShareButton>
                      </div>
                    </div>

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

                {/* Comment Section */}
                <CommentSection />

                {/* Related posts */}
                <RelatedPosts
                  category={postData.category}
                  currentPostDataID={postDataID}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default PostPage;
