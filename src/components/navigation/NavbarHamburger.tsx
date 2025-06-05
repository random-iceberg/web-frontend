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
    <div className="relative z-50">
      {/* Trigger */}
      <button
        type="button"
        aria-label="Toggle site navigation"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((o) => !o)}
        className="p-2 rounded focus-visible:ring transition"
      >
        {/* decorative brand mark */}
        <img src="/logo_transparent.png" alt="" className="w-10" />
      </button>

      {/* Menu */}
      {open && (
        <nav
          id="mobile-menu"
          role="menu"
          className="absolute left-0 top-12 w-60 space-y-3 rounded-xl bg-primary p-5 backdrop-blur shadow-2xl"
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
