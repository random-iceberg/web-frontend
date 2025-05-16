import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <header className="pb-5">
      <nav className="bg-accent">
        <div className="container mx-auto flex items-center justify-between pr-2">
          {/* Logo and Title */}
          <Link to="/" className="flex items-center space-x-2">
            <img src="/logo_transparent.png" alt="Logo" className="w-20" />
            <span className="text-3xl font-bold text-white">
              Titanic Survival Predictor
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-4 text-xl font-bold text-white">
            <ul className="flex space-x-6">
              <li>
                <Link to="/calculator" className="hover:text-secondary">
                  Survival Calculator
                </Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-secondary">
                  Admin Console
                </Link>
              </li>
            </ul>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-3">
            <Link
              to="/signin"
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition ease-in-out duration-150 bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-indigo-500"
            >
              Sign In
            </Link>

            <Link
              to="/signup"
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition ease-in-out duration-150 bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 border border-transparent"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
