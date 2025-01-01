import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSession } from "./context/SessionContext";

const ProtectedRoute = () => {
  const { isLoggedIn, loading } = useSession()

  if (loading) {
    return <div>Loading...</div>
  }
  // const isAuthenticated = !!localStorage.getItem("authToken"); // Example: Replace with real auth logic
  return (
    !isLoggedIn ? <Navigate to="/login" replace /> : <div><Outlet/></div>
  );
};

export default ProtectedRoute;
