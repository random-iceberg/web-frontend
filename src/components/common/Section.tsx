import React from "react";

/**
 * Props for the Section component. Extends standard HTML div attributes.
 * @typedef {object} SectionProps
 * @property {React.ReactNode} children - Content to be rendered inside the section.
 * @property {string} [className] - Additional CSS classes to apply to the section container.
 */
type SectionProps = React.HTMLAttributes<HTMLDivElement> & {
  children?: React.ReactNode;
  className?: string;
};

/**
 * A simple wrapper for content sections with consistent padding and max-width.
 * Uses a standard HTML <section> tag.
 * Accepts standard HTML attributes like `id`.
 *
 * @component
 * @param {SectionProps} props - Props for the Section component.
 * @example
 * <Section id="features" className="bg-gray-100">
 *   <h2>Features</h2>
 *   <p>Feature details go here.</p>
 * </Section>
 */
const Section: React.FC<SectionProps> = ({
  children,
  className = "",
  ...rest // Pass down other div attributes like id
}) => (
  <section
    className={`container mx-auto px-4 py-16 ${className}`.trim()} // Default py-16 padding
    {...rest}
  >
    {children}
  </section>
);

export default Section;
