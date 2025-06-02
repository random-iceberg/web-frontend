import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "providers/authProvider";

const Navbar: React.FC = () => {
  const { token, setToken } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken(null);
    navigate("/");
  };

  return (
    <header className="pb-5">
      <nav className="bg-primary">
        <div className="container mx-auto flex items-center justify-between px-4">
          {/* Logo and Title */}
          <Link to="/" className="flex items-center space-x-2">
            <img src="/logo_transparent.png" alt="Logo" className="w-20" />
            <span className="text-3xl font-bold text-[hsl(var(--background))]">
              Titanic Survival Predictor
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-6 text-xl font-bold text-[hsl(var(--background))]">
            <Link to="/calculator" className="hover:text-accent transition">
              Survival Calculator
            </Link>
            <Link to="/admin" className="hover:text-accent transition">
              Admin Console
            </Link>
            <Link to="/dashboard" className="hover:text-accent transition">
              User Dashboard
            </Link>
          </div>

          {/* Buttons change based on auth status */}
          <div className="flex items-center space-x-3">
            {!token ? (
              <>
                <Link
                  to="/signin"
                  className="px-4 py-2 text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition ease-in-out duration-150 bg-secondary text-[hsl(var(--foreground))] border border-secondary hover:bg-secondary/80 focus:ring-accent"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition ease-in-out duration-150 bg-primary text-[hsl(var(--background))] border border-transparent hover:bg-accent focus:ring-primary"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate("/dashboard")}
                  className="px-4 py-2 text-sm font-medium rounded-md bg-secondary text-[hsl(var(--foreground))] hover:bg-secondary/80 transition"
                >
                  Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition ease-in-out duration-150 bg-primary text-[hsl(var(--background))] border border-transparent hover:bg-accent focus:ring-primary"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
