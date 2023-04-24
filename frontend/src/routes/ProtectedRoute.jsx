import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ isAdmin, element: Element, ...rest }) => {
  // Get auth state from redux store
  const { isAuthenticated, loading, user } = useSelector((state) => state.auth);

  // Renders loading component if the authentication state is still loading
  if (loading) {
    return null;
  }

  // Navigate to the login page if the user is not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Navigate to the home page if the user is not an admin and the route requires admin role
  if (isAdmin && user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <Element {...rest} />;
};

export default ProtectedRoute;
