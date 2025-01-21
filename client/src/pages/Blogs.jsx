import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import { toast } from "react-hot-toast";

// import { assets, posts } from "../assets/assets";
import { assets } from "../assets/assets";
import Title2 from "../components/Title2";
import Title from "../components/Title";
import Button from "../components/Button";
import PostCard from "../components/PostCard";
import LoaderSpinner from "../components/LoaderSpinner";
import Notification from "../components/Notification";
// import HorizontalLine from "../components/HorizontalLine";

const Blogs = () => {
  const [showFilter, setShowFilter] = useState(false);

  const [posts, setPosts] = useState([]);
  // console.log(posts);
  const [fetching, setFetching] = useState(false);

  // 11:08:05 => searchTerm
  const [sidebarData, setSidebarData] = useState({
    searchTerm: "",
    sort: "desc",
    // category: "Uncategorized",
    category: "",
  });
  // console.log(sidebarData);

  // const [filteredPosts, setFilteredPosts] = useState([]);
  // console.log(filteredPosts);

  const [showMore, setShowMore] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  /*   const categoryTitle = [
    "Uncategorized",
    "Technology",
    "Health",
    "Finance",
    "Travel",
    "Lifestyle",
    "Food",
    "Education",
    "Business & Entrepreneurship",
    "Entertainment",
    "Parenting & Family",
    "Self-Improvement",
    "Sports & Fitness",
  ]; */

  const categoryTitle = [
    "Uncategorized",
    "Technology",
    "Health",
    "Finance",
    "Travel",
    "Lifestyle",
    "Food",
    "Education",
    "Business & Entrepreneurship",
    "Entertainment",
    "Parenting & Family",
    "Self-Improvement",
    "Sports & Fitness",
  ];

  const handleChange = (e) => {
    if (e.target.id === "searchTerm") {
      setSidebarData({ ...sidebarData, searchTerm: e.target.value });
    }
    if (e.target.id === "sort") {
      const order = e.target.value || "desc";
      setSidebarData({ ...sidebarData, sort: order });
    }
    if (e.target.id === "category") {
      // const category = e.target.value || "Uncategorized";
      const category = e.target.value;
      setSidebarData({ ...sidebarData, category });
    }
  };

  // useEffect for filtered posts
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);

    const searchTermFromUrl = urlParams.get("searchTerm");
    const sortFromUrl = urlParams.get("sort");
    const categoryFromUrl = urlParams.get("category");
    if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
      setSidebarData({
        ...sidebarData,
        searchTerm: searchTermFromUrl,
        sort: sortFromUrl,
        category: categoryFromUrl,
      });
    }

    // Fetching filter post
    const fetchFilterPosts = async () => {
      setFetching(true);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/post/get?${searchQuery}`);
      if (!res.ok) {
        // toast.error(data.message)
        setFetching(false);
        return;
      }
      if (res.ok) {
        const data = await res.json();
        // setFilteredPosts(data.posts);
        setPosts(data.posts);
        setFetching(false);
        if (data.posts.length === 9) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }
      }
    };

    fetchFilterPosts();
  }, [location.search]);

  const handleSubmitFilter = async (e) => {
    e.preventDefault();

    const urlParams = new URLSearchParams(location.search);

    urlParams.set("searchTerm", sidebarData.searchTerm);
    urlParams.set("sort", sidebarData.sort);
    urlParams.set("category", sidebarData.category);

    const searchQuery = urlParams.toString();
    navigate(`/blogs?${searchQuery}`);
  };

  // Handle show more button
  const handleShowMoreClick = async () => {
    try {
      const numberOfPosts = posts.length;
      const startIndex = numberOfPosts;

      const urlParams = new URLSearchParams(location.search);
      urlParams.set("startIndex", startIndex);

      const searchQuery = urlParams.toString();

      const res = await fetch(`/api/post/get?${searchQuery}`);
      const data = await res.json();

      if (!res.ok) {
        console.log(data.message);
        return;
      }
      if (res.ok) {
        setPosts([...posts, ...data.posts]);
        if (data.posts.length === 9) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // useEffect for all posts
  /* useEffect(() => {
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
          // setPosts(data.posts);
          setFetching(false);
        }
      } catch (error) {
        toast.error(error.message);
        setFetching(false);
      }
    };
    fetchPosts();
  }, []); */

  return (
    <div className="container">
      <div className="pt-2 sm:pt-6 md:pt-8 flex flex-col sm:flex-row gap-10 sm:gap-4">
        {/* Left - Filter options */}
        <form onSubmit={handleSubmitFilter}>
          <div
            className="flex gap-2 sm:gap-0 max-sm:cursor-pointer w-fit pr-2"
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
                  id="searchTerm"
                  placeholder="Search term..."
                  className="w-full bg-inherit border border-borderColor outline-borderColorHover rounded-sm px-2.5 py-1"
                  value={sidebarData.searchTerm}
                  onChange={handleChange}
                />
              </div>

              {/* Product sort */}
              <select
                id="sort"
                onChange={handleChange}
                value={sidebarData.sort}
                className="bg-inherit border border-borderColor outline-borderColorHover rounded-sm text-textColor2 font-light text-sm px-2 h-10 cursor-pointer"
              >
                <option value="desc">Sort by: Latest</option>
                <option value="asc">Sort by: Oldest</option>
              </select>

              {/* Category filter */}
              <div className="whitespace-nowrap">
                <p className="text-base font-medium text-textColor2 mb-2">
                  CATEGORIES
                </p>

                {/* <div className="text-textColor3 font-light text-sm flex flex-col gap-2">
                {categoryTitle.map((item, index) => (
                  <p className="flex gap-2 cursor-pointer" key={index}>
                    <input
                      type="checkbox"
                      id="category"
                      value={sidebarData.category}
                      // checked={sidebarData.category}
                      onChange={handleChange}
                      className="w-3 cursor-pointer"
                    />
                    {item}
                  </p>
                ))}
              </div> */}

                {/* <div className="text-textColor3 font-light text-sm flex flex-col gap-2">
                {categoryTitle.map((item, index) => (
                  <>
                    <p
                      className="cursor-pointer px-2 py-1 hover:bg-lightBgHover"
                      key={index}
                    >
                      {item}
                    </p>
                    <HorizontalLine />
                  </>
                ))}
              </div> */}

                <div className="text-textColor3 font-light text-sm flex flex-col gap-2">
                  <select
                    id="category"
                    onChange={handleChange}
                    value={sidebarData.category}
                    className="bg-inherit border border-borderColor outline-borderColorHover rounded-sm text-sm px-2 h-10 cursor-pointer"
                  >
                    <option value={""}>Select Category:</option>
                    {categoryTitle &&
                      categoryTitle.map((item, index) => (
                        <option key={index} value={item}>
                          {item}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              {/* Search button */}
              <div className="text-center">
                <Button
                  type={"submit"}
                  text={"Apply Filters"}
                  className={"border border-bgDark hover:bg-lightBgHover"}
                />
              </div>

              {/* Clear button */}
              <div className="text-center">
                <Link to={"/blogs"}>
                  <Button
                    type={"submit"}
                    text={"Clear Filters"}
                    className={"border border-bgDark hover:bg-lightBgHover"}
                  />
                </Link>
              </div>
            </div>
          </div>
        </form>

        {/* Right - All blogs */}
        <div className="flex-1">
          <div className="flex justify-between ">
            <div>
              <Title text1={"All"} text2={"Blogs"} />
            </div>

            {/* Product sort */}
            {/* <select className="bg-inherit border border-borderColor outline-borderColorHover rounded-sm text-sm px-2 h-10 cursor-pointer">
            <option value="relavent">Sort by: Relavent</option>
            <option value="old-new">Sort by: Old to New</option>
            <option value="new-old">Sort by: New to Old</option>
          </select> */}
          </div>

          {fetching && <LoaderSpinner />}

          {!fetching && posts && posts.length === 0 && (
            <Notification text={"Post Not Found!"} />
          )}

          {!fetching && posts && posts.length > 0 && (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 gap-y-6 -mt-1">
                {/* {posts.slice(0, 9).map((item, index) => ( */}
                {posts &&
                  posts.map((item, index) => (
                    <PostCard
                      key={index}
                      id={item._id}
                      postSlug={item.slug}
                      title={item.title}
                      content={item.content}
                      category={item.category}
                      image={item.image}
                      date={
                        item.updateDate ? item.updateDate : item.createdDate
                      }
                      postCreatorProfile={item.userData.profilePicture}
                      postCreatorName={item.userData.username}
                    />
                  ))}
              </div>

              {showMore && (
                <div className="text-center mt-6">
                  <Button
                    type={"button"}
                    text={"More"}
                    className={
                      // "text-textLight bg-bgDark border-none outline-none bg-opacity-95 hover:bg-opacity-100"
                      "text-textLight bg-bgDark border-none outline-none hover:bg-opacity-[93%]"
                    }
                    handleClick={handleShowMoreClick}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
