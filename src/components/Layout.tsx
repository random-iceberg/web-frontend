import React, { PropsWithChildren } from "react";
import { Outlet } from "react-router-dom";
import Footer from "components/Footer";
import ConnectionStatus from "components/ConnectionStatus";

/*
  This Component is our App Layout, adding common structure to all pages.
  Includes global components like Navbar, Footer, and ConnectionStatus to all pages.
  The Navbar component now handles both desktop and mobile layouts internally.
*/

const Layout: React.FC<PropsWithChildren> = ({ children }) => (
  <div className="min-h-screen flex flex-col">
    <main className="flex-grow">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 transition-opacity duration-500 ease-in">
        {children ?? <Outlet />}
      </div>
    </main>
    <Footer />
    <ConnectionStatus />
  </div>
);

export default Layout;
