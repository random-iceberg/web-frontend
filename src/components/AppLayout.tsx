import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "components/Navbar";
import ConnectionStatus from "components/ConnectionStatus";

/*
  This Component is our App Layout, adding common structure to all pages.
  Includes global components like Navbar, Footer, and ConnectionStatus to all pages.
*/

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 transition-opacity duration-500 ease-in">
          <Outlet />
        </div>
      </main>
      <ConnectionStatus />
    </div>
  );
};

export default Layout;
