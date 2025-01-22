import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRouteAdminCreator = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (currentUser && currentUser.isAdmin) ||
    (currentUser && currentUser.isCreator) ? (
    <Outlet />
  ) : (
    <Navigate to={"/sign-in"} />
  );
};

export default PrivateRouteAdminCreator;
