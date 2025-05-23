import React from "react";

type InlineErrorProps = {
  children: React.ReactNode;
  className?: string;
};

const InlineError: React.FC<InlineErrorProps> = ({ children, className = "" }) => {
  return (
    <p
      className={`text-sm text-red-700 mt-1 ${className}`.trim()}
      role="alert"
    >
      {children}
    </p>
  );
};

export default InlineError;