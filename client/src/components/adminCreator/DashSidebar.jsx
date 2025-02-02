import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import { assets } from "../../assets/assets";
import HorizontalLine from "../HorizontalLine";
import Badge from "../Badge";

// const DashSidebar = ({ tab, setTab }) => {
const DashSidebar = () => {
  const { currentUser } = useSelector((state) => state.user);

  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <div className="pt-2 sm:pt-6 md:pt-8">
      <div className="w-full h-full md:w-56">
        <div className="flex flex-col gap-2 py-1.5 font-base text-xl border border-borderColor">
          <Link to={"/dashboard?tab=dashboard"}>
            <div
              className={`px-4 py-1.5 flex items-center gap-2 cursor-pointer ${
                tab === "dashboard"
                  ? "bg-lightBgHover"
                  : "hover:bg-lightBgHover"
              }`}
              // onClick={() => setTab("dashboard")}
            >
              <img
                src={assets.dashboard_icon}
                alt="dashboard_icon"
                className="w-6 h-6 md:w-7 md:h-7"
              />
              <p>Dashboard</p>
            </div>
          </Link>

          <HorizontalLine />

          <Link to={"/dashboard?tab=profile"}>
            <div
              className={`px-4 py-1.5 flex justify-between cursor-pointer ${
                tab === "profile" ? "bg-lightBgHover" : "hover:bg-lightBgHover"
              }`}
            >
              <span className="flex gap-2">
                <img
                  src={assets.id_card}
                  alt="dashboard_icon"
                  className="w-6 h-6 md:w-7 md:h-7"
                />
                <p>Profile</p>
              </span>
              <Badge
                badgeTitle={
                  currentUser && currentUser.isAdmin ? "Admin" : "Creator"
                }
                textSize={"xs"}
                paddingX={"2"}
                paddingY={"0.5"}
              />
            </div>
          </Link>

          <HorizontalLine />

          <Link to={"/dashboard?tab=create"}>
            <div
              className={`px-4 py-1.5 flex items-center gap-2 cursor-pointer ${
                tab === "create" ? "bg-lightBgHover" : "hover:bg-lightBgHover"
              }`}
              // onClick={() => setTab("posts")}
            >
              <img
                src={assets.document_plus}
                alt="dashboard_icon"
                className="w-6 h-6 md:w-7 md:h-7 scale-x-[-1]"
              />
              <p>Create</p>
            </div>
          </Link>

          <HorizontalLine />

          <Link to={"/dashboard?tab=posts"}>
            <div
              className={`px-4 py-1.5 flex items-center gap-2 cursor-pointer ${
                tab === "posts" ? "bg-lightBgHover" : "hover:bg-lightBgHover"
              }`}
              // onClick={() => setTab("posts")}
            >
              <img
                src={assets.posts_icon}
                alt="dashboard_icon"
                className="w-6 h-6 md:w-7 md:h-7"
              />
              <p>Posts</p>
            </div>
          </Link>

          {currentUser && currentUser.isAdmin && (
            <>
              <HorizontalLine />
              <Link to={"/dashboard?tab=comments"}>
                <div
                  className={`px-4 py-1.5 flex items-center gap-2 cursor-pointer ${
                    tab === "comments"
                      ? "bg-lightBgHover"
                      : "hover:bg-lightBgHover"
                  }`}
                  // onClick={() => setTab("users")}
                >
                  <img
                    src={assets.message}
                    alt="dashboard_icon"
                    className="w-6 h-6 md:w-7 md:h-7"
                  />
                  <p>Comments</p>
                </div>
              </Link>
            </>
          )}

          {currentUser && currentUser.isAdmin && (
            <>
              <HorizontalLine />
              <Link to={"/dashboard?tab=messages"}>
                <div
                  className={`px-4 py-1.5 flex items-center gap-2 cursor-pointer ${
                    tab === "messages"
                      ? "bg-lightBgHover"
                      : "hover:bg-lightBgHover"
                  }`}
                  // onClick={() => setTab("users")}
                >
                  <img
                    src={assets.message_icon}
                    alt="message_icon"
                    className="w-6 h-6 md:w-7 md:h-7"
                  />
                  <p>Messages</p>
                </div>
              </Link>
            </>
          )}

          {currentUser && currentUser.isAdmin && (
            <>
              <HorizontalLine />
              <Link to={"/dashboard?tab=subscribers"}>
                <div
                  className={`px-4 py-1.5 flex items-center gap-2 cursor-pointer ${
                    tab === "subscribers"
                      ? "bg-lightBgHover"
                      : "hover:bg-lightBgHover"
                  }`}
                  // onClick={() => setTab("users")}
                >
                  <img
                    src={assets.subscribers}
                    alt="message_icon"
                    className="w-6 h-6 md:w-7 md:h-7"
                  />
                  <p>Subscribers</p>
                </div>
              </Link>
            </>
          )}

          {currentUser && currentUser.isAdmin && (
            <>
              <HorizontalLine />
              <Link to={"/dashboard?tab=package-enrolled"}>
                <div
                  className={`px-4 py-1.5 flex items-center gap-2 cursor-pointer ${
                    tab === "package-enrolled"
                      ? "bg-lightBgHover"
                      : "hover:bg-lightBgHover"
                  }`}
                  // onClick={() => setTab("users")}
                >
                  <img
                    src={assets.package_enroll}
                    alt="message_icon"
                    className="w-6 h-6 md:w-7 md:h-7 whitespace-nowrap"
                  />
                  <p>Package Enroll</p>
                </div>
              </Link>
            </>
          )}

          {currentUser && currentUser.isAdmin && (
            <>
              <HorizontalLine />
              <Link to={"/dashboard?tab=users"}>
                <div
                  className={`px-4 py-1.5 flex items-center gap-2 cursor-pointer ${
                    tab === "users"
                      ? "bg-lightBgHover"
                      : "hover:bg-lightBgHover"
                  }`}
                  // onClick={() => setTab("users")}
                >
                  <img
                    src={assets.users_icon}
                    alt="dashboard_icon"
                    className="w-6 h-6 md:w-7 md:h-7"
                  />
                  <p>Users</p>
                </div>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashSidebar;
