/**
 * Main application component for the Titanic App frontend.
 *
 * TODO:
 *   - Integrate routing (e.g., with React Router) for multiple pages.
 *   - Add global state management if needed (e.g., Context API or Redux).
 */
import React, { Suspense, lazy } from "react"; // Import Suspense and lazy
import "./global.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// Remove direct import: import AdminConsole from "./components/admin/AdminConsole";
import ConnectionStatus from "./components/connectionStatus";
import ProxyIndicator from "./components/ProxyIndicator";

// Lazy load page components
const AdminConsole = lazy(() => import("./components/admin/AdminConsole"));
// Placeholders can also be lazy-loaded if they become complex
const Home = lazy(() => Promise.resolve({ default: () => <div className="p-8 text-center">Home Page</div> }));
const Calculator = lazy(() => Promise.resolve({ default: () => <div className="p-8 text-center">Survival Calculator</div> }));

// Basic loading fallback component
const LoadingFallback = () => (
  <div className="p-8 text-center text-gray-500">Loading page...</div>
);

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <header className="bg-blue-600 text-white">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center">
              <div className="flex items-center space-x-2">
                <img
                  src="/logo.png"
                  alt="Titanic App Logo"
                  className="h-10 w-auto"
                />
                <h1 className="text-2xl font-bold">
                  Titanic Survivor Prediction
                </h1>
              </div>
              <nav className="mt-4 md:mt-0">
                <ul className="flex space-x-6">
                  <li>
                    <Link to="/" className="hover:underline font-medium">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/calculator"
                      className="hover:underline font-medium"
                    >
                      Survival Calculator
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin" className="hover:underline font-medium">
                      Admin Console
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </header>

        {/* Main Content with Suspense */}
        <main className="flex-grow">
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/calculator" element={<Calculator />} />
              <Route path="/admin" element={<AdminConsole />} />
            </Routes>
          </Suspense>
        </main>

        {/* Footer */}
        <footer className="bg-gray-100 py-4 text-center text-gray-600">
          © 2024 Titanic App. All rights reserved.
        </footer>
        {/*{process.env.NODE_ENV === 'development' && <ProxyIndicator />*/}
        <ConnectionStatus />
      </div>
    </Router>
  );
};

export default App;
