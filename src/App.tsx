/**
 * Main application component for the Titanic App frontend.
 * 
 * TODO:
 *   - Integrate routing (e.g., with React Router) for multiple pages.
 *   - Add global state management if needed (e.g., Context API or Redux).
 */
import React from 'react';
import './global.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AdminConsole from './components/AdminConsole';
import ConnectionStatus from './components/connectionStatus';
import ProxyIndicator from './components/ProxyIndicator';


// Placeholder components for other pages
const Home = () => <div className="p-8 text-center">Home Page</div>;
const Calculator = () => <div className="p-8 text-center">Survival Calculator</div>;

const App: React.FC = () => {
  return (
   <Router>

      <div className="min-h-screen flex flex-col">
        {/* TODO: Add a header component and navigation based on the project style */}
        <header className="bg-blue-600 text-white">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center">
              <div className="flex items-center space-x-2">
              <img src="/logo.png" alt="Titanic App Logo" className="h-10 w-auto" />
              <h1 className="text-2xl font-bold">Titanic Survivor Prediction</h1>
              </div>
              <nav className="mt-4 md:mt-0">
                <ul className="flex space-x-6">
                  <li><Link to="/" className="hover:underline font-medium">Home</Link></li>
                  <li><Link to="/calculator" className="hover:underline font-medium">Survival Calculator</Link></li>
                  <li><Link to="/admin" className="hover:underline font-medium">Admin Console</Link></li>
                </ul>
              </nav>
            </div>
          </div>
        </header>

        {/* Main Content */}
        {/* TODO: Insert additional components/pages as needed i.e <ExampleComponent />*/}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/admin" element={<AdminConsole />} />
          </Routes>
        </main>

        {/* TODO: Add a footer component */}
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