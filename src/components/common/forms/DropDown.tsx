import React, { useState, useEffect, useRef } from "react";

/**
 * Props for the DropDown component.
 * @typedef {object} DropDownProps
 * @property {string} label - Text label displayed above the dropdown trigger.
 * @property {React.ReactNode} children - The options to display in the dropdown. Typically buttons or simple elements.
 * @property {string} id - Unique ID for the dropdown trigger button.
 * @property {string} value - The currently selected value (should match the content of one of the children options).
 * @property {(value: string) => void} onSelect - Callback function when an option is selected.
 * @property {boolean} [disabled=false] - Whether the dropdown is disabled.
 * @property {string} [description] - Optional description text displayed below the label.
 */
type DropDownProps = {
  label: string;
  children: React.ReactNode;
  id: string;
  value: string;
  onSelect: (value: string) => void;
  disabled?: boolean;
  description?: string; // Optional description text
};

/**
 * A custom dropdown component implemented with a button trigger and a panel showing options.
 * Handles opening/closing and selecting options.
 *
 * @component
 * @param {DropDownProps} props - Props for the DropDown component.
 * @example
 * const [selectedValue, setSelectedValue] = useState('');
 * const options = ['Option 1', 'Option 2', 'Option 3'];
 *
 * <DropDown
 *   id="my-dropdown"
 *   label="Select Option"
 *   value={selectedValue}
 *   onSelect={setSelectedValue}
 *   description="Choose one from the list."
 * >
 *   {options.map(opt => <button type="button" key={opt}>{opt}</button>)}
 * </DropDown>
 */
const DropDown: React.FC<DropDownProps> = ({
  label,
  children,
  id,
  value,
  onSelect,
  disabled = false,
  description,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const descriptionId = description ? `${id}-description` : undefined;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {label}
      </label>
      <button
        type="button"
        id={id}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className="w-full text-left bg-white text-gray-700 text-base px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed"
        aria-describedby={descriptionId}
      >
        {value || label} {/* Display selected value or label as placeholder */}
      </button>
      {description && (
        <p id={descriptionId} className="mt-2 text-sm text-gray-600">
          {description}
        </p>
      )}
      {isOpen && (
        <div
          role="listbox"
          className="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-60 overflow-auto"
        >
          {React.Children.map(children, (child: any) => {
            // Assuming children are simple elements like <button> or <div> containing the value
            const childValue = child.props.children;
            return (
              <div
                role="option"
                aria-selected={value === childValue}
                onClick={() => {
                  onSelect(childValue);
                  setIsOpen(false);
                }}
                className={`px-4 py-2 cursor-pointer text-base text-gray-700 hover:bg-gray-100
                  ${value === childValue ? "bg-gray-200 font-semibold" : ""}`}
              >
                {/* Render the child directly (e.g., the button text) */}
                {child.props.children}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DropDown; // Exporting as DropDown
