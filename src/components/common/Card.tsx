import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string; // Allow passing additional classes
}

const Card: React.FC<CardProps> = ({ children, className = "" }) => {
  const baseStyles =
    "bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow";
  const combinedClassName = `${baseStyles} ${className}`.trim();

  return <div className={combinedClassName}>{children}</div>;
};

export default Card;
