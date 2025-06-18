/*
Draft Doc

This Component is for Page Headers, Use this to keep page header layout uniform across the app.
*/
import React from "react";

interface PageHeaderProps {
  title: string;
  description: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, description }) => {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
      <p className="text-lg text-gray-600">{description}</p>
    </div>
  );
};

export default PageHeader;
