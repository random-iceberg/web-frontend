import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "providers/authProvider";
import useBreakpoint from "hooks/useBreakpoint";

const Navbar: React.FC = () => {
  const { isAuthenticated, logout, isLoading, authStatus, role } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggingOut = authStatus === "logging_out";
  const { isMdUp } = useBreakpoint();

  const handleLogout = async () => {
    try {
      await logout();

      // Navigate to home page after logout
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Desktop Navbar
  if (isMdUp) {
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
            <div className="flex space-x-6 text-xl font-bold text-[hsl(var(--background))]">
              <Link
                to="/calculator"
                className={`hover:text-accent transition ${
                  location.pathname === "/calculator" ? "text-accent" : ""
                }`}
              >
                Survival Calculator
              </Link>

              {isAuthenticated && role === "admin" && (
                <Link
                  to="/admin"
                  className={`hover:text-accent transition ${
                    location.pathname === "/admin" ? "text-accent" : ""
                  }`}
                >
                  Admin Console
                </Link>
              )}
              {isAuthenticated && (
                <Link
                  to="/dashboard"
                  className={`hover:text-accent transition ${
                    location.pathname === "/dashboard" ? "text-accent" : ""
                  }`}
                >
                  User Dashboard
                </Link>
              )}
            </div>

            {/* Auth Buttons - Consistent sizing */}
            <div className="flex items-center space-x-3">
              {isLoading ? (
                <div className="px-4 py-2 text-sm text-[hsl(var(--background))]">
                  Loading...
                </div>
              ) : !isAuthenticated ? (
                // Always show auth buttons when not authenticated
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
                // Show user menu when authenticated - same size as auth buttons
                <>
                  <button
                    onClick={() => navigate("/dashboard")}
                    disabled={isLoggingOut}
                    className={`px-4 py-2 text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition ease-in-out duration-150 bg-secondary text-[hsl(var(--foreground))] border border-secondary hover:bg-secondary/80 focus:ring-accent ${
                      location.pathname === "/dashboard"
                        ? "bg-secondary/80"
                        : ""
                    }`}
                  >
                    Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="px-4 py-2 text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition ease-in-out duration-150 bg-primary text-[hsl(var(--background))] border border-transparent hover:bg-accent focus:ring-primary"
                  >
                    {isLoggingOut ? "Logging Out..." : "Logout"}
                  </button>
                </>
              )}
            </div>
          </div>
        </nav>
      </header>
    );
  }

  // Mobile Hamburger Navbar
  return <MobileNavbar />;
};

// Mobile Navbar Component
const MobileNavbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { isAuthenticated, logout, isLoading, authStatus, role } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggingOut = authStatus === "logging_out";

  const handleLogout = async () => {
    try {
      await logout();
      setOpen(false); // Close menu
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleLinkClick = () => {
    setOpen(false);
  };

  return (
    <div className="relative z-50 w-full">
      {/* Button with logo and title */}
      <button
        type="button"
        aria-label="Toggle site navigation"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-3 p-3 rounded focus-visible:ring transition bg-primary"
      >
        {/* Logo */}
        <img src="/logo_transparent.png" alt="Titanic Logo" className="w-10" />
        {/* Title */}
        <span className="text-2xl font-bold text-[hsl(var(--background))]">
          Titanic Survival Predictor
        </span>
      </button>

      {/* Dropdown Menu */}
      {open && (
        <nav
          id="mobile-menu"
          role="menu"
          className="absolute left-0 w-full space-y-3 rounded-xl bg-primary p-5 backdrop-blur shadow-2xl z-40"
          style={{ top: "calc(100% + 0.5rem)" }}
        >
          {/* Navigation Links */}
          <Link
            role="menuitem"
            to="/calculator"
            onClick={handleLinkClick}
            className={`block text-base font-medium hover:translate-x-1 hover:text-accent transition ${
              location.pathname === "/calculator" ? "text-accent" : "text-white"
            }`}
          >
            Survival Calculator
          </Link>

          {isAuthenticated && role === "admin" && (
            <Link
              role="menuitem"
              to="/admin"
              onClick={handleLinkClick}
              className={`block text-base font-medium hover:translate-x-1 hover:text-accent transition ${
                location.pathname === "/admin" ? "text-accent" : "text-white"
              }`}
            >
              Admin Console
            </Link>
          )}
          {isAuthenticated && (
            <Link
              role="menuitem"
              to="/dashboard"
              onClick={handleLinkClick}
              className={`block text-base font-medium hover:translate-x-1 hover:text-accent transition ${
                location.pathname === "/dashboard"
                  ? "text-accent"
                  : "text-white"
              }`}
            >
              User Dashboard
            </Link>
          )}

          {/* Divider */}
          <hr className="border-white/20" />

          {/* Auth Section */}
          {isLoading ? (
            <div className="text-white text-base">Loading...</div>
          ) : !isAuthenticated ? (
            // Always show auth links when not authenticated
            <>
              <Link
                role="menuitem"
                to="/signin"
                onClick={handleLinkClick}
                className={`block text-base font-medium hover:translate-x-1 hover:text-accent transition ${
                  location.pathname === "/signin" ? "text-accent" : "text-white"
                }`}
              >
                Sign In
              </Link>
              <Link
                role="menuitem"
                to="/signup"
                onClick={handleLinkClick}
                className={`block text-base font-medium hover:translate-x-1 hover:text-accent transition ${
                  location.pathname === "/signup" ? "text-accent" : "text-white"
                }`}
              >
                Sign Up
              </Link>
            </>
          ) : (
            // Show user menu when authenticated
            <>
              <button
                role="menuitem"
                onClick={() => {
                  navigate("/dashboard");
                  handleLinkClick();
                }}
                disabled={isLoggingOut}
                className={`block w-full text-left text-base font-medium hover:translate-x-1 hover:text-accent transition ${
                  location.pathname === "/dashboard"
                    ? "text-accent"
                    : "text-white"
                }`}
              >
                Profile
              </button>
              <button
                role="menuitem"
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="block w-full text-left text-base font-medium text-white hover:translate-x-1 hover:text-accent transition"
              >
                {isLoggingOut ? "Logging Out..." : "Logout"}
              </button>
            </>
          )}
        </nav>
      )}
    </div>
  );
};

export default Navbar;
