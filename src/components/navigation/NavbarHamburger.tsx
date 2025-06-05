import React, { useState } from "react";
import { Link } from "react-router-dom";

export function Hamburger() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => setIsOpen((prev) => !prev);

  return (
    <div className="relative z-50">
      {/* Titanic Logo Button */}
      <button onClick={handleClick} type="button" aria-label="Toggle menu" className="p-2 rounded transition">
        <img src="/logo_transparent.png" alt="Menu" className="w-14" />
    </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <nav className="absolute top-14 left-0 w-screen bg-primary/90 backdrop-blur-xl shadow-lg flex flex-col items-start px-6 py-4 space-y-3">
          {[
            ["Survival Calculator", "/calculator"],
            ["Admin Console", "/admin"],
            ["User Dashboard", "/dashboard"],
            ["Sign In", "/signin"],
            ["Sign Up", "/signup"],
          ].map(([label, path]) => (
            <Link
              key={path}
              to={path}
              className="text-lg font-semibold text-[hsl(var(--background))] hover:text-accent transition"
              onClick={handleClick}
            >
              {label}
            </Link>
          ))}
        </nav>
      )}
    </div>
  );
}
