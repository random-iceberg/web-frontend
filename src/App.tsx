import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ConnectionStatus from "components/connectionStatus";
import "./global.css";

/* ────── lazy-loaded pages ────── */
const LandingPage = lazy(() => import("pages/LandingPage"));
const AdminConsole = lazy(() => import("components/admin/AdminConsole"));
const Calculator = lazy(() => import("components/calculator/SurvivalCalculator"));

/* still a stub – swap out when real components exist */
const SignIn = lazy(() =>
  Promise.resolve({
    default: () => <div className="p-8 text-center">Sign In</div>,
  }),
);
const SignUp = lazy(() =>
  Promise.resolve({
    default: () => <div className="p-8 text-center">Sign Up</div>,
  }),
);

/* generic suspense fallback */
const Loading = () => (
  <div className="p-8 text-center text-gray-500">Loading…</div>
);

const App: React.FC = () => (
  <Router>
    <div className="min-h-screen flex flex-col">
      {/* ─── Header / Nav ─── */}
      <header className="bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between px-4 py-4">
          <Link to="/" className="flex items-center space-x-2">
            <img src="/logo.png" alt="Titanic logo" className="h-10 w-auto" />
            <h1 className="text-2xl font-bold">Titanic Survivor Prediction</h1>
          </Link>

          <nav className="mt-4 md:mt-0">
            <ul className="flex space-x-6 font-medium">
              <li>
                <Link to="/" className="hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/calculator" className="hover:underline">
                  Survival Calculator
                </Link>
              </li>
              <li>
                <Link to="/admin" className="hover:underline">
                  Admin Console
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* ─── Main ─── */}
      <main className="flex-grow">
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/admin" element={<AdminConsole />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </Suspense>
      </main>

      {/* ─── Footer ─── */}
      <footer className="bg-gray-100 py-4 text-center text-gray-600">
        © {new Date().getFullYear()} Titanic App. All rights reserved.
      </footer>

      {/* connection health badge */}
      <ConnectionStatus />
    </div>
  </Router>
);

export default App;
