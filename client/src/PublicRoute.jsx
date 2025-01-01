import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSession } from "./context/SessionContext";

const PublicRoute = () => {
  const { isLoggedIn } = useSession();
  return isLoggedIn ? <Navigate to="/" replace /> : <Outlet />;
};

export default PublicRoute;
