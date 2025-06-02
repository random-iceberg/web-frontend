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

  // Routes for public access
  const routesForPublic = [
    {
      index: true,
      element: <LandingPage />,
    },
    {
      path: "/signin",
      element: <SignIn />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
  ];

  // Routes for authenticated users only
  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          path: "/calculator",
          element: <Calculator />,
        },
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
  ];

  // Routes for not authenticated users only. TODO: maybe we don't need this?
  const routesForNotAuthenticatedOnly = [
    {
      index: true,
      element: <LandingPage />,
    },
    {
      path: "/signin",
      element: <SignIn />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
  ];
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />, // shared AppLayout here
      children: [
        ...routesForPublic,
        ...(!token ? routesForNotAuthenticatedOnly : []),
        {
          path: "/",
          element: <ProtectedRoute />,
          children: routesForAuthenticatedOnly.flatMap((r) => r.children),
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default Routes;
