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
// import Notification from "../../components/Notification";

const DashboardView = () => {
  const { currentUser } = useSelector((state) => state.user);

  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);

  const [totalAdmin, setTotalAdmin] = useState(0);
  const [totalCreators, setTotalCreators] = useState(0);
  const [totalNormalUsers, setTotalNormalUsers] = useState(0);

  // 10:22:26
  const [comments, setComments] = useState([]);
  const [totalComments, setTotalComments] = useState(0);
  const [lastMonthComments, setLastMonthComments] = useState(0);

  const [messages, setMessages] = useState([]);
  const [totalMessages, setTotalMessages] = useState(0);
  const [lastMonthMessages, setLastMonthMessages] = useState(0);

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
          setTotalNormalUsers(data.totalNormalUser);
          setTotalCreators(data.totalCreator);
          setTotalAdmin(data.totalAdmin);
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

    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/comment/getComments?limit=5`);
        const data = await res.json();
        if (res.ok) {
          setComments(data.comments);
          setTotalComments(data.totalComments);
          setLastMonthComments(data.lastMonthComments);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    const fetchMessages = async () => {
      try {
        const res = await fetch(`/api/message/getMessages?limit=5`);
        const data = await res.json();
        if (res.ok) {
          setMessages(data.messages);
          setTotalMessages(data.totalMessages);
          setLastMonthMessages(data.lastMonthMessages);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    if (currentUser.isAdmin) {
      fetchUsers();
      fetchPosts();
      fetchComments();
      fetchMessages();
    }

    // Aborting useEffect for unnecessary fetch
    return () => {
      console.log("Cleaning up useEffect of fetching dashboard data.");
      controller.abort();
    };
  }, [currentUser]);

  // Users status and count
  /*  const userStatus = {
    creator: 5,
    user: 10,
  }; */

  return (
    <>
      {fetching && <LoaderSpinner />}

      {/* {!fetching &&
        currentUser &&
        currentUser.isAdmin &&
        (users.length === 0 || posts.length === 0) && (
          <Notification text={"Data Not Found!"} />
        )} */}

      {!fetching && currentUser && currentUser.isAdmin && (
        <div className="flex flex-col gap-12">
          {/* Total result card */}
          <div className="flex flex-wrap gap-4 justify-center">
            {/* Total Users */}
            {/* <TotalDataCard
              title={"Total Users"}
              totalData={totalUsers}
              icon={assets.users_icon}
              lastMonthData={lastMonthUsers}
              totalNormalUsers={totalNormalUsers}
              totalCreators={totalCreators}
            /> */}

            <div className="w-full md:w-72 rounded-sm shadow-md border border-borderColor p-4">
              <div className="flex flex-col gap-5">
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-xl text-textColor2 font-light">
                      Total Users
                    </h3>
                    <p className="text-2xl text-textColor1">{totalUsers}</p>
                  </div>
                  <img
                    src={assets.users_icon}
                    alt="card_icon"
                    className="w-12 h-12 object-cover object-center"
                  />
                </div>
                {/* User Status */}
                {/* {totalNormalUsers && totalCreators && ( */}
                <div className="text-textColor3 text-xs font-light flex gap-2 -my-4">
                  <p>
                    <span className="font-medium text-blue-700 text-sm">
                      {totalAdmin}
                    </span>{" "}
                    {totalAdmin <= 1 ? "Admin" : "Admins"}
                  </p>
                  <p>
                    <span className="font-medium text-blue-700 text-sm">
                      {totalCreators}
                    </span>{" "}
                    {totalCreators <= 1 ? "Creator" : "Creators"}
                  </p>
                  <p>
                    <span className="font-medium text-blue-700 text-sm">
                      {totalNormalUsers}
                    </span>{" "}
                    {totalNormalUsers <= 1 ? "User" : "Users"}
                  </p>
                </div>
                {/* )} */}
                <div className="flex gap-2 items-center">
                  <span className="text-blue-700 flex items-center font-medium">
                    <img
                      src={assets.arrow_up_navigation}
                      alt="arrow_up_icon"
                      className="w-4 h-4 object-cover object-center"
                    />
                    {lastMonthUsers}
                  </span>
                  <p className="text-textColor3 text-sm font-light">
                    Last month
                  </p>
                </div>
              </div>
            </div>

            {/* Total Messages */}
            <TotalDataCard
              title={"Total Messages"}
              totalData={totalMessages}
              icon={assets.message_icon}
              lastMonthData={lastMonthMessages}
            />

            {/* Total Comments */}
            <TotalDataCard
              title={"Total Comments"}
              totalData={totalComments}
              icon={assets.message}
              lastMonthData={lastMonthComments}
            />

            {/* Total Posts */}
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
                {users && users.length < 1 ? (
                  <tbody>
                    <tr className="border-b border-borderColor text-textColor3 text-center">
                      <td className="p-4 text-base font-light" colSpan="2">
                        No Data Found!
                      </td>
                    </tr>
                  </tbody>
                ) : (
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
                )}
              </table>
            </div>

            {/* Comment Table */}
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div className="font-light -mb-4">
                  <Title2 text1={"Recent"} text2={"Comments"} />
                </div>

                <Link to={"/dashboard?tab=comments"}>
                  <Button
                    type={"button"}
                    text={"See All"}
                    className={
                      "border border-bgDark hover:bg-lightBgHover text-xs"
                    }
                  />
                </Link>
              </div>
              <table className="table-auto w-full border border-borderColor rounded-sm text-left">
                <thead className="bg-lightBgHover border-b border-borderColorHover uppercase text-textColor2">
                  <tr>
                    <th className="p-4 font-medium">Comment_Content</th>
                    <th className="p-4 font-medium">Likes</th>
                  </tr>
                </thead>
                <tbody>
                  {comments &&
                    comments.map((comment, index) => (
                      <tr
                        key={index}
                        className="hover:bg-lightBgHover border-b border-borderColor text-textColor3"
                      >
                        <td className="p-4 text-base font-medium">
                          {comment.content}
                        </td>
                        <td className="p-4 text-base font-medium">
                          {comment.numberOfLikes}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex flex-col gap-12 xl:flex-row">
            {/* Message Table */}
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div className="font-light -mb-4">
                  <Title2 text1={"Recent"} text2={"Messages"} />
                </div>

                <Link to={"/dashboard?tab=messages"}>
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
                    <th className="p-4 font-medium">full_name</th>
                    <th className="p-4 font-medium">Message</th>
                    {/* <th className="p-4 font-medium">Email</th> */}
                  </tr>
                </thead>
                {messages && messages.length < 1 ? (
                  <tbody>
                    <tr className="border-b border-borderColor text-textColor3 text-center">
                      <td className="p-4 text-base font-light" colSpan="2">
                        No Data Found!
                      </td>
                    </tr>
                  </tbody>
                ) : (
                  <tbody>
                    {messages &&
                      messages.map((data, index) => (
                        <tr
                          key={index}
                          className="hover:bg-lightBgHover border-b border-borderColor text-textColor3"
                        >
                          <td className="p-4 text-base font-light">
                            <p>{data.fullname}</p>
                          </td>
                          <td className="p-4 text-base font-medium">
                            {data.message}
                          </td>
                          {/* <td className="p-4 text-base font-light">{data.email}</td> */}
                        </tr>
                      ))}
                  </tbody>
                )}
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
      )}
    </>
  );
};

export default DashboardView;
