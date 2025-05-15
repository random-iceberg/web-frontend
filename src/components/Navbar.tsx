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

              <li>
                <Link to="/dashboard" className="hover:text-secondary">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-3">
            <Link
              to="/signin"
              className="bg-white text-accent hover:bg-secondary font-semibold px-4 py-2 rounded transition"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="bg-secondary text-accent hover:bg-white px-4 py-2 rounded font-semibold transition"
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
