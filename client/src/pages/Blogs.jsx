import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

// import { assets, posts } from "../assets/assets";
import { assets } from "../assets/assets";
import Title2 from "../components/Title2";
import Title from "../components/Title";
import Button from "../components/Button";
import PostCard from "../components/PostCard";
import LoaderSpinner from "../components/LoaderSpinner";
import Notification from "../components/Notification";

const Blogs = () => {
  const [showFilter, setShowFilter] = useState(false);

  const [posts, setPosts] = useState([]);
  // console.log(posts);

  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setFetching(true);
        const res = await fetch(`/api/post/get`);
        const data = await res.json();
        if (!res.ok) {
          toast.error(data.message);
          setFetching(false);
          return;
        }
        if (res.ok) {
          setPosts(data.posts);
          setFetching(false);
        }
      } catch (error) {
        toast.error(error.message);
        setFetching(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="pt-2 sm:pt-6 md:pt-8 flex flex-col sm:flex-row gap-10 sm:gap-4">
      {/* Left - Filter options */}
      <div className="">
        <div
          className="flex gap-2 sm:gap-0 cursor-pointer w-fit pr-2"
          onClick={() => setShowFilter(!showFilter)}
        >
          <Title2 text1={"Filters"} />
          <img
            src={assets.dropdown_icon}
            alt="dropdown icon"
            className={`h-3 mt-2 ${showFilter && "rotate-90"} sm:hidden`}
          />
        </div>

        {/* Filter options */}
        <div className={`sm:block ${showFilter ? "" : "hidden"}`}>
          <div
            className={`border border-borderColorHover px-4 py-6 rounded-sm flex flex-col gap-6 `}
          >
            {/* Search box */}
            <div>
              <input
                type="text"
                placeholder="Search term..."
                className="w-full bg-inherit border border-textColor3 outline-borderColorHover rounded-sm px-2.5 py-1"
              />
            </div>

            {/* Category filter */}
            <div>
              <p className="text-base font-medium text-textColor1 mb-4">
                CATEGORIES
              </p>

              <div className="text-textColor3 font-light text-sm flex flex-col gap-2">
                <p className="flex gap-2">
                  <input type="checkbox" value={"Technology"} className="w-3" />
                  Technology
                </p>

                <p className="flex gap-2">
                  <input type="checkbox" value={"Health"} className="w-3" />
                  Health
                </p>

                <p className="flex gap-2">
                  <input type="checkbox" value={"Finance"} className="w-3" />
                  Finance
                </p>

                <p className="flex gap-2">
                  <input type="checkbox" value={"Travel"} className="w-3" />
                  Travel
                </p>

                <p className="flex gap-2">
                  <input type="checkbox" value={"Lifestyle"} className="w-3" />
                  Lifestyle
                </p>

                <p className="flex gap-2">
                  <input type="checkbox" value={"Food"} className="w-3" />
                  Food
                </p>

                <p className="flex gap-2">
                  <input type="checkbox" value={"Education"} className="w-3" />
                  Education
                </p>

                <p className="flex gap-2">
                  <input
                    type="checkbox"
                    value={"Business & Entrepreneurship"}
                    className="w-3"
                  />
                  Business & Entrepreneurship
                </p>

                <p className="flex gap-2">
                  <input
                    type="checkbox"
                    value={"Entertainment"}
                    className="w-3"
                  />
                  Entertainment
                </p>

                <p className="flex gap-2">
                  <input
                    type="checkbox"
                    value={"Parenting & Family"}
                    className="w-3"
                  />
                  Parenting & Family
                </p>

                <p className="flex gap-2">
                  <input
                    type="checkbox"
                    value={"Self-Improvement"}
                    className="w-3"
                  />
                  Self-Improvement
                </p>

                <p className="flex gap-2">
                  <input
                    type="checkbox"
                    value={"Sports & Fitness"}
                    className="w-3"
                  />
                  Sports & Fitness
                </p>
              </div>
            </div>

            {/* Search button */}
            <div className="text-center">
              <Button
                type={"button"}
                text={"Apply Filters"}
                className={"border border-bgDark hover:bg-lightBgHover"}
                handleClick={() => alert("Processing...")}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Right - All blogs */}
      <div className="flex-1">
        <div className="flex justify-between ">
          <div>
            <Title text1={"All"} text2={"Blogs"} />
          </div>

          {/* Product sort */}
          <select className="bg-inherit border border-borderColor outline-borderColorHover rounded-sm text-sm px-2 h-10">
            <option value="relavent">Sort by: Relavent</option>
            <option value="old-new">Sort by: Old to New</option>
            <option value="new-old">Sort by: New to Old</option>
          </select>
        </div>

        {fetching && <LoaderSpinner />}

        {!fetching && posts.length === 0 && (
          <Notification text={"Post Not Found!"} />
        )}

        {!fetching && posts.length > 0 && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 gap-y-6 -mt-1">
              {posts.slice(0, 9).map((item, index) => (
                <PostCard
                  key={index}
                  id={item._id}
                  postSlug={item.slug}
                  title={item.title}
                  content={item.content}
                  category={item.category}
                  image={item.image}
                  date={item.updateDate ? item.updateDate : item.createdDate}
                  postCreatorProfile={item.userData.profilePicture}
                  postCreatorName={item.userData.username}
                />
              ))}
            </div>

            <div className="text-center mt-6">
              <Button
                type={"button"}
                text={"More"}
                className={
                  // "text-textLight bg-bgDark border-none outline-none bg-opacity-95 hover:bg-opacity-100"
                  "text-textLight bg-bgDark border-none outline-none hover:bg-opacity-[93%]"
                }
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Blogs;
