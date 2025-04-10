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
import ExampleComponent from './components/ExampleComponent';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* TODO: Add a header component and navigation based on the project style */}
      <header className="p-4 shadow-md">
        <h1 className="text-4xl font-bold">Titanic Survivor Prediction</h1>
      </header>

      {/* Main Content */}
      <main className="p-4">
        <ExampleComponent />
        {/* TODO: Insert additional components/pages as needed */}
      </main>

      {/* TODO: Add a footer component */}
      <footer className="p-4 text-sm text-center border-t">
        © 2024 Titanic App. All rights reserved.
      </footer>
    </div>
  );
};

export default App;
