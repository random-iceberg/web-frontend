import React from "react";

/**
 * Props for the Card component.
 * @typedef {object} CardProps
 * @property {React.ReactNode} children - Content to be rendered inside the card.
 * @property {string} [className] - Additional CSS classes to apply to the card container.
 */
interface CardProps {
  children?: React.ReactNode; // Made children optional
  className?: string; // Allow passing additional classes
}

/**
 * A simple container component with padding, shadow, and rounded corners.
 * Useful for grouping content visually.
 *
 * @component
 * @param {CardProps} props - Props for the Card component.
 * @example
 * <Card className="mt-4 p-6">
 *   <h2>Card Title</h2>
 *   <p>Card content goes here.</p>
 * </Card>
 */
const Card: React.FC<CardProps> = ({ children, className = "" }) => {
  const baseStyles =
    "bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow"; // Default padding is p-4
  const combinedClassName = `${baseStyles} ${className}`.trim();

  return <div className={combinedClassName}>{children}</div>;
};

export default Card;
