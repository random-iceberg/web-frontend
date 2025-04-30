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
import ConnectionStatus from './components/connectionStatus';
import ProxyIndicator from './components/ProxyIndicator';

import LandingPage from './pages/LandingPage';
// import SurvivalCalculatorUI from './pages/SurvivalCalculatorUI';
import AdminConsole from './pages/AdminConsole'; // @TODO: make this a page.

const SignIn: React.FC = () => <>Sign in</>;
const SignUp: React.FC = () => <>Sign up</>;

const App: React.FC = () => {
  return (
  <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* <Route path="/calculator" element={<SurvivalCalculatorUI />} /> */}
        <Route path="/admin" element={<AdminConsole />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
  </Router>
  );
};

export default App;