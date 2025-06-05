import React, { useState } from "react";
import { Link } from "react-router-dom";

interface HamburgerProps {
  onClick: () => void;
}

export function Hamburger(props: HamburgerProps) {
  const { onClick } = props;
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen((prev) => !prev);
    onClick();
  };

  return (
    <>
      <button
        onClick={handleClick}
        type="button"
        className="w-8 h-8 flex justify-around flex-col z-10 cursor-pointer"
      >
        <div
          className={`bg-black block w-8 h-[0.35rem] rounded transition-all origin-[1px] ${
            isOpen ? "rotate-45" : "rotate-0"
          }`}
        />
        <div
          className={`bg-black block w-8 h-[0.35rem] rounded transition-all origin-[1px] ${
            isOpen ? "translate-x-full bg-transparent" : "translate-x-0"
          }`}
        />
        <div
          className={`bg-black block w-8 h-[0.35rem] rounded transition-all origin-[1px] ${
            isOpen ? "-rotate-45" : "rotate-0"
          }`}
        />
      </button>

      {isOpen && (
        <nav className="absolute top-full left-0 w-full bg-primary flex flex-col items-start p-4 space-y-3 md:hidden z-50">
          <Link
            to="/calculator"
            className="text-lg font-bold text-[hsl(var(--background))] hover:text-accent"
            onClick={handleClick}
          >
            Survival Calculator
          </Link>
          <Link
            to="/admin"
            className="text-lg font-bold text-[hsl(var(--background))] hover:text-accent"
            onClick={handleClick}
          >
            Admin Console
          </Link>
          <Link
            to="/dashboard"
            className="text-lg font-bold text-[hsl(var(--background))] hover:text-accent"
            onClick={handleClick}
          >
            User Dashboard
          </Link>
          <Link
            to="/signin"
            className="text-lg font-bold text-[hsl(var(--background))] hover:text-accent"
            onClick={handleClick}
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            className="text-lg font-bold text-[hsl(var(--background))] hover:text-accent"
            onClick={handleClick}
          >
            Sign Up
          </Link>
        </nav>
      )}
    </>
  );
}
