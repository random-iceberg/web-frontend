/*
Draft Doc

This Component is for Page Layout, Use this to keep the general Outer layout of the page uniform across the app.
*/
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 transition-opacity duration-500 ease-in">
      {children}
    </div>
  );
};

export default Layout;
