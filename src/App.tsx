// src/App.tsx
/**
 * Main application component for the Titanic App frontend.
 * 
 * TODO:
 *   - Integrate routing (e.g., with React Router) for multiple pages.
 *   - Add global state management if needed (e.g., Context API or Redux).
 */
import React from 'react';
import './global.css';
import LandingPage from './pages/LandingPage';

const App: React.FC = () => {
  return (
    <LandingPage />
  );
};

export default App;
