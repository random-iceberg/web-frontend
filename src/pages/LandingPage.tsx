import React from 'react';
import '../global.css';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ExampleComponent from '../components/ExampleComponent';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      { /* Header Component */ } 
      <header className="p-4 shadow-md">
        <Navbar />
      </header>

      {/* Main Content */}
      <main className="p-4">
        <ExampleComponent />
        {/* Additional components go here */}
      </main>

      {/* Footer Component */}
      <Footer />
    </div>
  );
};

export default LandingPage;