import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import TotalDataCard from "../../components/admin/TotalDataCard";
import { assets } from "../../assets/assets";

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
    <div>
      <div className="flex flex-wrap gap-4 justify-center">
        <TotalDataCard
          title={"Total Users"}
          totalData={totalUsers}
          icon={assets.users_icon}
          lastMonthData={lastMonthUsers}
        />
        <TotalDataCard
          title={"Total Posts"}
          totalData={totalPosts}
          icon={assets.posts_icon}
          lastMonthData={lastMonthPosts}
        />
        <TotalDataCard 
            title={"Total Comments"}
            totalData={'54'}
            // icon={assets.posts_icon}
            lastMonthData={'17'}
        />
      </div>
    </div>
  );
};

export default DashboardView;
