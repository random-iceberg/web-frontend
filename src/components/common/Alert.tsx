import React from "react";

/**
 * Alert variants for styling.
 * @typedef {'success' | 'error' | 'warning' | 'info'} AlertVariant
 */
type AlertVariant = "success" | "error" | "warning" | "info";

/**
 * Props for the Alert component.
 * @typedef {object} AlertProps
 * @property {AlertVariant} [variant='info'] - The style variant of the alert.
 * @property {string} [title] - Optional title for the alert.
 * @property {React.ReactNode} children - The main message content of the alert.
 * @property {string} [className] - Additional CSS classes to apply to the alert container.
 */
type AlertProps = {
  variant?: AlertVariant;
  title?: string; // Optional title
  children: React.ReactNode; // Message content
  className?: string;
};

// Mapping variants to Tailwind classes
const variantStyles: Record<
  AlertVariant,
  { bg: string; border: string; text: string; icon: string; titleText: string }
> = {
  success: {
    bg: "bg-green-50",
    border: "border-green-300",
    text: "text-green-700",
    icon: "✅", // Check Mark Button emoji
    titleText: "text-green-800",
  },
  error: {
    bg: "bg-red-50",
    border: "border-red-300",
    text: "text-red-700",
    icon: "❌", // Cross Mark emoji
    titleText: "text-red-800",
  },
  warning: {
    bg: "bg-yellow-50",
    border: "border-yellow-300",
    text: "text-yellow-700",
    icon: "⚠️", // Warning Sign emoji
    titleText: "text-yellow-800",
  },
  info: {
    bg: "bg-blue-50",
    border: "border-blue-300",
    text: "text-blue-700",
    icon: "ℹ️", // Information Source emoji
    titleText: "text-blue-800",
  },
};

/**
 * Displays messages with different variants (success, error, warning, info).
 * Includes an icon, optional title, and message content.
 *
 * @component
 * @param {AlertProps} props - Props for the Alert component.
 * @example
 * // Error Alert
 * <Alert variant="error" title="Error">
 *   Something went wrong.
 * </Alert>
 *
 * @example
 * // Success Alert without title
 * <Alert variant="success">
 *   Operation completed successfully.
 * </Alert>
 */
const Alert: React.FC<AlertProps> = ({
  variant = "info",
  title,
  children,
  className = "",
}) => {
  const styles = variantStyles[variant];

  return (
    <div
      className={`p-4 rounded-md border ${styles.bg} ${styles.border} ${className}`.trim()}
      role="alert"
    >
      <div className="flex">
        <div className="flex-shrink-0">
          <span aria-hidden="true">{styles.icon}</span>
        </div>
        <div className="ml-3">
          {title && (
            <h3 className={`text-sm font-medium ${styles.titleText}`}>
              {title}
            </h3>
          )}
          <div className={`mt-1 text-sm ${styles.text}`}>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Alert;
