/*
Draft Doc

This Component is for Loading States, Use this while content is loading.
*/
import React from "react";

interface LoadingStateProps {
  message: string;
}

const LoadingState: React.FC<LoadingStateProps> = ({ message }) => {
  return <div className="p-8 text-center bg-gray-50 rounded-lg">{message}</div>;
};

export default LoadingState;
