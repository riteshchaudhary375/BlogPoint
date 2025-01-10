import React, { useState } from "react";

import DashSidebar from "../../components/admin/DashSidebar";
import DashboardView from "./DashboardView";
import DashPosts from "./DashPosts";
import DashUsers from "./DashUsers";

const AdminDashboard = () => {
  const [tab, setTab] = useState("dashboard");

  return (
    <div className="min-h-screen">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-56">
          <DashSidebar tab={tab} setTab={setTab} />
        </div>

        <div className="pt-2 sm:pt-6 md:pt-8">
          {tab === "dashboard" && <DashboardView />}

          {tab === "posts" && <DashPosts />}

          {tab === "users" && <DashUsers />}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
