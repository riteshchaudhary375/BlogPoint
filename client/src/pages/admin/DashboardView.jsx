import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { assets } from "../../assets/assets";
import TotalDataCard from "../../components/admin/TotalDataCard";
import Title2 from "../../components/Title2";
import Button from "../../components/Button";
import Badge from "../../components/Badge";
import LoaderSpinner from "../../components/LoaderSpinner";
import Notification from "../../components/Notification";

const DashboardView = () => {
  const { currentUser } = useSelector((state) => state.user);

  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);

  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchUsers = async () => {
      try {
        setFetching(true);

        const res = await fetch(`/api/user/getUsers?limit=5`, { signal });
        const data = await res.json();
        if (!res.ok) {
          toast.error(data.message);
          setFetching(false);
          return;
        }
        if (res.ok) {
          setUsers(data.users);
          setTotalUsers(data.totalUsers);
          setLastMonthUsers(data.lastMonthUsers);
          setFetching(false);
        }
      } catch (error) {
        toast.error(error.message);
        setFetching(false);
      }
    };

    const fetchPosts = async () => {
      try {
        setFetching(true);

        const res = await fetch(`/api/post/get?limit=5`, { signal });
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

    if (currentUser.isAdmin) {
      fetchUsers();
      fetchPosts();
    }

    // Aborting useEffect for unnecessary fetch
    return () => {
      console.log("Cleaning up useEffect of fetching dashboard data.");
      controller.abort();
    };
  }, [currentUser]);

  return (
    <>
      {fetching && <LoaderSpinner />}

      {!fetching &&
        currentUser &&
        currentUser.isAdmin &&
        (users.length === 0 || posts.length === 0) && (
          <Notification text={"Data Not Found!"} />
        )}

      {!fetching &&
        currentUser &&
        currentUser.isAdmin &&
        (users.length > 0 || posts.length > 0) && (
          <div className="flex flex-col gap-12">
            {/* Total result card */}
            <div className="flex flex-wrap gap-4 justify-center">
              <TotalDataCard
                title={"Total Users"}
                totalData={totalUsers}
                icon={assets.users_icon}
                lastMonthData={lastMonthUsers}
              />

              <TotalDataCard
                title={"Total Comments"}
                totalData={"54"}
                // icon={assets.posts_icon}
                lastMonthData={"17"}
              />

              <TotalDataCard
                title={"Total Posts"}
                totalData={totalPosts}
                icon={assets.posts_icon}
                lastMonthData={lastMonthPosts}
              />
            </div>

            <div className="flex flex-col gap-12 xl:flex-row">
              {/* User Table */}
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div className="font-light -mb-4">
                    <Title2 text1={"Recent"} text2={"Users"} />
                  </div>

                  <Link to={"/dashboard?tab=users"}>
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
                      <th className="p-4 font-medium">Profile_Picture</th>
                      <th className="p-4 font-medium">Username</th>
                      {/* <th className="p-4 font-medium">Email</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {users &&
                      users.map((data, index) => (
                        <tr
                          key={index}
                          className="hover:bg-lightBgHover border-b border-borderColor text-textColor3"
                        >
                          <td className="p-4 text-base font-light">
                            <img
                              src={data.profilePicture}
                              alt="user_image"
                              className="w-8 h-8 rounded-full object-cover object-center inline-block"
                            />
                          </td>
                          <td className="p-4 text-base font-medium">
                            {data.username}
                          </td>
                          {/* <td className="p-4 text-base font-light">{data.email}</td> */}
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>

              {/* Comment Table */}
              <div className="flex-1">
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
            </div>

            {/* Post Table */}
            <div>
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
                  {posts &&
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
                          <p className="">{data.title}</p>
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
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
    </>
  );
};

export default DashboardView;
