import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "providers/authProvider";
import { ProtectedRoute } from "./ProtectedRoute";
import React, { lazy } from "react";
import AppLayout from "components/AppLayout";

/* lazy-loaded pages */
const SignIn = lazy(() => import("pages/SignIn"));
const SignUp = lazy(() => import("pages/SignUp"));
const LandingPage = lazy(() => import("pages/LandingPage"));
const UserDashboard = lazy(() => import("pages/UserDashboard"));
const AdminConsole = lazy(() => import("components/admin/AdminConsole"));
const Calculator = lazy(
  () => import("components/calculator/SurvivalCalculator"),
);

const Routes: React.FC = () => {
  const { token } = useAuth();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        // Public routes - always accessible
        {
          index: true,
          element: <LandingPage />,
        },
        {
          path: "/calculator",
          element: <Calculator />,
        },
        // Auth routes - only show when not authenticated
        ...(token
          ? []
          : [
              {
                path: "/signin",
                element: <SignIn />,
              },
              {
                path: "/signup",
                element: <SignUp />,
              },
            ]),
        // Protected routes - only accessible when authenticated
        {
          path: "/",
          element: <ProtectedRoute />,
          children: [
            {
              path: "/admin",
              element: <AdminConsole />,
            },
            {
              path: "/dashboard",
              element: <UserDashboard />,
            },
          ],
        },
        // Catch-all redirect to home
        {
          path: "*",
          element: <LandingPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
