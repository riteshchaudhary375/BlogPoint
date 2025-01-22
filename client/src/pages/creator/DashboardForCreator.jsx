import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { assets } from "../../assets/assets";
import LoaderSpinner from "../../components/LoaderSpinner";
import TotalDataCard from "../../components/admin/TotalDataCard";
import Title2 from "../../components/Title2";
import Button from "../../components/Button";
import Badge from "../../components/Badge";

const DashboardForCreator = () => {
  const { currentUser } = useSelector((state) => state.user);

  const [posts, setPosts] = useState([]);
  //   console.log(posts);
  const [totalPosts, setTotalPosts] = useState(0);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchPosts = async () => {
      try {
        setFetching(true);

        const res = await fetch(
          `/api/post/get?userId=${currentUser._id}&limit=5`,
          { signal }
        );
        const data = await res.json();
        if (!res.ok) {
          toast.error(data.message);
          setFetching(false);
          return;
        }
        if (res.ok) {
          setPosts(data.posts);
          setTotalPosts(data.totalPosts);
          setLastMonthPosts(data.lastMonthPosts);
          setFetching(false);
        }
      } catch (error) {
        toast.error(error.message);
        setFetching(false);
      }
    };

    if (currentUser.isCreator) {
      fetchPosts();
    }

    // Aborting useEffect for unnecessary fetch
    return () => {
      console.log("Cleaning up useEffect of fetching dashboard data.");
      controller.abort();
    };
  }, [currentUser._id]);

  return (
    <>
      {fetching && <LoaderSpinner />}

      {!fetching && currentUser && currentUser.isCreator && (
        <div className="flex flex-col gap-12">
          {/* Total result card */}
          <div className="flex flex-wrap gap-4 justify-center">
            {/* Total Comments */}
            <TotalDataCard
              title={"Total Comments"}
              totalData={"54"}
              // icon={assets.posts_icon}
              lastMonthData={"17"}
            />

            {/* Total Posts */}
            <TotalDataCard
              title={"Total Posts"}
              totalData={totalPosts}
              icon={assets.posts_icon}
              lastMonthData={lastMonthPosts}
            />
          </div>

          <div className="flex flex-col gap-12 ">
            {/* Comment Table */}
            <div className="w-[600px] mx-auto">
              <div className="flex items-center justify-between">
                <div className="font-light -mb-4">
                  <Title2 text1={"Recent"} text2={"Comments"} />
                </div>

                <Button
                  type={"button"}
                  text={"See All"}
                  className={
                    "border border-bgDark hover:bg-lightBgHover text-xs"
                  }
                  handleClick={() => alert("Processing...")}
                />
              </div>

              <table className="table-auto w-full border border-borderColor rounded-sm text-left">
                <thead className="bg-lightBgHover border-b border-borderColorHover uppercase text-textColor2">
                  <tr>
                    <th className="p-4 font-medium">Comment_Content</th>
                    <th className="p-4 font-medium">Likes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-lightBgHover border-b border-borderColor text-textColor3">
                    <td className="p-4 text-base font-medium">nice post</td>
                    <td className="p-4 text-base font-medium">7</td>
                  </tr>
                  <tr className="hover:bg-lightBgHover border-b border-borderColor text-textColor3">
                    <td className="p-4 text-base font-medium">Informative</td>
                    <td className="p-4 text-base font-medium">2</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Post Table */}
            <div className="">
              <div className="flex items-center justify-between">
                <div className="font-light -mb-4">
                  <Title2 text1={"Recent"} text2={"Posts"} />
                </div>

                <Link to={"/dashboard?tab=posts"}>
                  <Button
                    type={"button"}
                    text={"See All"}
                    className={
                      "border border-bgDark hover:bg-lightBgHover text-xs"
                    }
                    // handleClick={() => alert("Processing...")}
                  />
                </Link>
              </div>
              <table className="table-auto w-full border border-borderColor rounded-sm text-left">
                <thead className="bg-lightBgHover border-b border-borderColorHover uppercase text-textColor2">
                  <tr>
                    <th className="p-4 font-medium">Post_Image</th>
                    <th className="p-4 font-medium">Post_Title</th>
                    <th className="p-4 font-medium">Category</th>
                  </tr>
                </thead>
                <tbody>
                  {/* {users.length > 0 || posts.length > 0) && ( posts && */}
                  {posts && posts.length < 1 ? (
                    <tr className="border-b border-borderColor text-textColor3 text-center">
                      <td className="p-4 text-base font-light"></td>
                      <td className="p-4 text-base font-light">
                        Data Not Found!
                      </td>
                      <td className="p-4 text-base font-light"></td>
                    </tr>
                  ) : (
                    posts &&
                    posts.map((data, index) => (
                      <tr
                        key={index}
                        className="hover:bg-lightBgHover border-b border-borderColor text-textColor3"
                      >
                        <td className="p-4 text-base font-light">
                          <img
                            src={data.image}
                            alt="post_image"
                            className="w-20 h-10 rounded-sm object-cover object-center inline-block"
                          />
                        </td>

                        <td className="p-4 pb-0 mt-2 text-base font-medium line-clamp-1">
                          <Link to={`/post/${data.slug}`}>
                            <p className="cursor-pointer hover:underline">
                              {data.title}
                            </p>
                          </Link>
                        </td>

                        <td className="p-4 text-base font-light">
                          <Badge
                            badgeTitle={data.category}
                            textSize={"xs"}
                            paddingX={"1"}
                            paddingY={"0.5"}
                          />
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardForCreator;
