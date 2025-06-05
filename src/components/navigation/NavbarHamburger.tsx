import React, { useState } from "react";
import { Link } from "react-router-dom";

const LINKS: [string, string][] = [
  ["Survival Calculator", "/calculator"],
  ["Admin Console", "/admin"],
  ["User Dashboard", "/dashboard"],
  ["Sign In", "/signin"],
  ["Sign Up", "/signup"],
];

/** Mobile / tablet navigation toggle */
const NavbarHamburger: React.FC = () => {
  const [open, setOpen] = useState(false);

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
          style={{ top: "calc(100% + 0.5rem)" }} // <-- key to position below button with gap
        >
          {LINKS.map(([label, path]) => (
            <Link
              role="menuitem"
              key={path}
              to={path}
              onClick={() => setOpen(false)}
              className="block text-base font-medium text-white hover:translate-x-1 hover:text-accent transition"
            >
              {label}
            </Link>
          ))}
        </nav>
      )}
    </div>
  );
};

export default NavbarHamburger;
