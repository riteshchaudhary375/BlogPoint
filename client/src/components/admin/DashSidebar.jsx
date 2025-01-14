import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { assets } from "../../assets/assets";
import HorizontalLine from "../HorizontalLine";

// const DashSidebar = ({ tab, setTab }) => {
const DashSidebar = () => {
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

          <HorizontalLine />

          <Link to={"/dashboard?tab=users"}>
            <div
              className={`px-4 py-1.5 flex items-center gap-2 cursor-pointer ${
                tab === "users" ? "bg-lightBgHover" : "hover:bg-lightBgHover"
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
        </div>
      </div>
    </div>
  );
};

export default DashSidebar;
