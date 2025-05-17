/*
Draft Doc

This Component is for Empty States.
*/
import React from "react";

interface EmptyStateProps {
  message: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ message }) => {
  return <div className="p-8 text-center bg-gray-50 rounded-lg">{message}</div>;
};

export default EmptyState;
