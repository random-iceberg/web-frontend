import React, { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Navbar from "components/Navbar";
import Hamburger from "components/navigation/NavbarHamburger";
import Footer from "components/Footer";
import ConnectionStatus from "components/ConnectionStatus";
import useBreakpoint from "hooks/useBreakpoint";

import "./global.css";

/* ────── lazy-loaded pages ────── */
const LandingPage = lazy(() => import("pages/LandingPage"));
const AdminConsole = lazy(() => import("components/admin/AdminConsole"));
const Calculator = lazy(
  () => import("components/calculator/SurvivalCalculator"),
);
const UserDashboard = lazy(() => import("pages/UserDashboard"));
const SignIn = lazy(() => import("pages/SignIn"));
const SignUp = lazy(() => import("pages/SignUp"));

/* ────── generic suspense fallback ────── */
const Loading = () => (
  <div className="p-8 text-center text-gray-500">Loading…</div>
);

const App: React.FC = () => {
  const { isMdUp } = useBreakpoint();

  return (
    <Router>
      {/* ─── Navigation ─── */}
      <header className="w-full">{isMdUp ? <Navbar /> : <Hamburger />}</header>

      {/* ─── Main content ─── */}
      <main className="flex flex-col min-h-screen">
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route index element={<LandingPage />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/admin" element={<AdminConsole />} />
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </main>

      {/* ─── Footer & Status ─── */}
      <Footer />
      <ConnectionStatus />
    </Router>
  );
};

export default App;
