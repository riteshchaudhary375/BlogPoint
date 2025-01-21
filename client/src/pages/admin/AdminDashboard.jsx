import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import DashSidebar from "../../components/admin/DashSidebar";
import DashboardView from "./DashboardView";
import DashPosts from "./DashPosts";
import DashUsers from "./DashUsers";
import DashProfile from "./DashProfile";
import CreatePost from "./CreatePost";

const AdminDashboard = ({ showModal, setShowModal }) => {
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
            {tab === "dashboard" && <DashboardView />}

            {tab === "profile" && (
              <DashProfile showModal={showModal} setShowModal={setShowModal} />
            )}

            {tab === "create" && <CreatePost />}

            {tab === "posts" && (
              <DashPosts showModal={showModal} setShowModal={setShowModal} />
            )}

            {tab === "users" && (
              <DashUsers showModal={showModal} setShowModal={setShowModal} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
