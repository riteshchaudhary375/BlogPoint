import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import DashSidebar from "../../components/adminCreator/DashSidebar";
import DashboardView from "../admin/DashboardView";
import DashPosts from "../admin/DashPosts";
import DashUsers from "../admin/DashUsers";
import DashProfile from "./DashProfile";
import CreatePost from "./CreatePost";
import { useSelector } from "react-redux";
import MyPosts from "../creator/MyPosts";
import DashboardForCreator from "../creator/DashboardForCreator";
import DashComments from "../../components/admin/DashComments";

const Dashboard = ({ showModal, setShowModal }) => {
  const { currentUser } = useSelector((state) => state.user);

  const location = useLocation();
  // const [tab, setTab] = useState("dashboard");
  const [tab, setTab] = useState("");

  useEffect(() => {
    // Tab => 3:56:17
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    // console.log(tabFromUrl);
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <div className="container min-h-screen">
      <div className={showModal ? "bodyFixed" : undefined}>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-56">
            <DashSidebar tab={tab} setTab={setTab} />
          </div>

          <div className="pt-2 sm:pt-6 md:pt-8 flex-1 overflow-scroll">
            {tab === "dashboard" && currentUser && currentUser.isAdmin && (
              <DashboardView />
            )}

            {tab === "dashboard" && currentUser && currentUser.isCreator && (
              <DashboardForCreator />
            )}

            {tab === "profile" && (
              <DashProfile showModal={showModal} setShowModal={setShowModal} />
            )}

            {tab === "create" && <CreatePost />}

            {/* Admin */}
            {tab === "posts" && currentUser && currentUser.isAdmin && (
              <DashPosts showModal={showModal} setShowModal={setShowModal} />
            )}

            {/* Creator */}
            {tab === "posts" && currentUser && currentUser.isCreator && (
              <MyPosts showModal={showModal} setShowModal={setShowModal} />
            )}

            {/* Admin */}
            {tab === "comments" && currentUser && currentUser.isAdmin && (
              <DashComments showModal={showModal} setShowModal={setShowModal} />
            )}

            {/* Admin */}
            {tab === "users" && currentUser && currentUser.isAdmin && (
              <DashUsers showModal={showModal} setShowModal={setShowModal} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
