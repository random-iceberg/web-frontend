import React from "react";

/**
 * Button style variants.
 * @typedef {'primary' | 'secondary' | 'danger' | 'link'} ButtonVariant
 */
type ButtonVariant = "primary" | "secondary" | "danger" | "link";

/**
 * Button size options.
 * @typedef {'sm' | 'md' | 'lg'} ButtonSize
 */
type ButtonSize = "sm" | "md" | "lg";

/**
 * Props for the Button component. Extends standard HTML button attributes.
 * @typedef {object} ButtonProps
 * @property {ButtonVariant} [variant='primary'] - The style variant of the button.
 * @property {ButtonSize} [size='md'] - The size of the button.
 * @property {boolean} [fullWidth=false] - Whether the button should take up the full width of its container.
 * @property {React.ReactNode} children - The content inside the button.
 * @property {string} [className] - Additional CSS classes to apply.
 */
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  children: React.ReactNode;
};

/**
 * A versatile button component with different variants and sizes.
 * It accepts all standard HTML button attributes like `onClick`, `disabled`, `type`, etc.
 *
 * @component
 * @param {ButtonProps} props - Props for the Button component.
 * @example
 * // Primary Button
 * <Button onClick={() => console.log('Clicked!')}>Submit</Button>
 *
 * @example
 * // Secondary Button (Small)
 * <Button variant="secondary" size="sm" onClick={handleCancel}>Cancel</Button>
 *
 * @example
 * // Danger Button (Full Width, Disabled)
 * <Button variant="danger" fullWidth disabled={isDeleting}>Delete</Button>
 *
 * @example
 * // Link style button
 * <Button variant="link" onClick={showDetails}>View Details</Button>
 */
const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
  children,
  ...props // Pass down other button attributes like type, onClick, disabled
}) => {
  // Base styles
  const base =
    "inline-flex items-center justify-center font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition ease-in-out duration-150";

  // Size styles
  const sizes: Record<ButtonSize, string> = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  // Variant styles
  const variants: Record<ButtonVariant, string> = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 border border-transparent",
    secondary:
      "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-indigo-500", // Adjusted focus ring for visibility
    danger:
      "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 border border-transparent",
    link: "text-blue-600 hover:text-blue-800 underline focus:ring-blue-500 shadow-none border-none bg-transparent p-0", // Link style
  };

  const width = fullWidth ? "w-full" : "";

  const combinedClassName =
    `${base} ${sizes[size]} ${variants[variant]} ${width} ${className}`.trim();

  return (
    <button className={combinedClassName} {...props}>
      {children}
    </button>
  );
};

export default Button;
