import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ConnectionStatus from "components/connectionStatus";
import Navbar from "components/Navbar";
import { Hamburger } from "components/navigation/NavbarHamburger";
import Footer from "components/Footer";
import "./global.css";

/* ────── lazy-loaded pages ────── */
const LandingPage = lazy(() => import("pages/LandingPage"));
const AdminConsole = lazy(() => import("components/admin/AdminConsole"));
const Calculator = lazy(() => import("components/calculator/SurvivalCalculator"));
const UserDashboard = lazy(() => import("pages/UserDashboard"));
const SignIn = lazy(() => import("pages/SignIn"));
const SignUp = lazy(() => import("pages/SignUp"));

/* generic suspense fallback */
const Loading = () => (
  <div className="p-8 text-center text-gray-500">Loading…</div>
);

const App: React.FC = () => (
  <Router>
    <div>
      {/* Navbar visible on md+ */}
      <div className="hidden md:block w-full">
        <Navbar />
      </div>

      {/* Hamburger visible on smaller screens */}
      <div className="block md:hidden w-full">
        <Hamburger />
      </div>

      {/* Main content */}
      <main className="flex-grow">
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/admin" element={<AdminConsole />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard" element={<UserDashboard />} />
          </Routes>
        </Suspense>
      </main>

      {/* Footer */}
      <Footer />

      {/* Connection status badge */}
      <ConnectionStatus />
    </div>
  </Router>
);

export default App;
