import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-accent py-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo + Title Section */}
        <div className='flex items-center space-x-2'>
          <img src="/favicon.ico" alt="Logo" className='max-w-40' /> 
          <span className="text-4xl font-bold">Titanic Survivor Predictor</span>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-4 text-2xl font-bold">
          <a href="/signin" className="hover:text-white">Sign in</a>
          <a href="/signup" className="hover:text-white pr-4">Sign up</a>
        </div>

        {/* @TODO: Implement Mobile Menu Button */}
      </div>
    </nav>
  );
};

export default Navbar;