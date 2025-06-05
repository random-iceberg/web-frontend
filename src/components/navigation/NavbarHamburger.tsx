import { Link } from "react-router-dom";

export function Hamburger() {
  return (
    <div className="relative z-50 group inline-block">
      {/* Logo links to Landing Page */}
      <Link
        to="/"
        aria-label="Go to Landing Page"
        className="inline-block p-2 rounded transition hover:scale-105 hover:opacity-90"
      >
        <img src="/logo_transparent.png" alt="Menu" className="w-14" />
      </Link>

      {/* Dropdown Menu - appears on hover */}
      <nav
        className="
          absolute top-16 left-0 w-64 rounded-xl bg-primary/95 backdrop-blur-md shadow-2xl border border-white/10
          flex flex-col items-start px-6 py-5 space-y-4
          opacity-0 translate-y-2 pointer-events-none
          group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto
          transition-all duration-300 ease-in-out
        "
      >
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
            className="w-full text-base font-medium text-white hover:text-accent hover:translate-x-1 transition-all duration-200"
          >
            {label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
