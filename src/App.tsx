import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ConnectionStatus from "components/connectionStatus";
import Navbar from "components/Navbar";
import Footer from "components/Footer";
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

/* generic suspense fallback */
const Loading = () => (
  <div className="p-8 text-center text-gray-500">Loading…</div>
);

const App: React.FC = () => (
  <Router>
    <div className="min-h-screen flex flex-col">
      {/* Use Navbar component */}
      <Navbar />

      {/* ─── Main ─── */}
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

      {/* Use Footer component */}
      <Footer />

      {/* connection health badge */}
      <ConnectionStatus />
    </div>
  </Router>
);

export default App;
