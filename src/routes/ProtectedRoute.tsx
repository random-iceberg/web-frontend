import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "providers/authProvider";
import LoadingState from "components/common/LoadingState";

interface ProtectedRouteProps {
  adminOnly?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  adminOnly = false,
}) => {
  const { isAuthenticated, isAdmin, isLoading } = useAuth();

  // Show loading state while auth is being initialized
  if (isLoading) {
    return <LoadingState message="Checking authentication..." />;
  }

  // Redirect to signin if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  // Redirect to /
  if (adminOnly && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  // Render protected content
  return <Outlet />;
};
