import React from "react";

/**
 * Structure for options passed to the Select component.
 * @typedef {object} SelectOption
 * @property {string | number} value - The actual value submitted.
 * @property {string} label - The text displayed for the option.
 */
type SelectOption = {
  value: string | number;
  label: string;
};

// Omit the native 'onChange' from HTMLSelectAttributes to avoid type conflict
// with our custom 'onChange' that passes the string value directly.
/**
 * Props for the Select component. Extends standard HTML select attributes, omitting `onChange`.
 * @typedef {object} SelectProps
 * @property {string} label - Text label displayed above the select input.
 * @property {string} id - Unique ID for the select input and linking label.
 * @property {SelectOption[]} options - Array of options to populate the select dropdown.
 * @property {string | number} value - The currently selected value.
 * @property {(value: string) => void} onChange - Callback function when the selection changes. Passes the new string value.
 * @property {boolean} [required=false] - Whether the select input is required.
 * @property {string} [placeholder] - Optional placeholder text (rendered as a disabled option).
 * @property {boolean} [disabled=false] - Whether the select input is disabled.
 * @property {string} [className] - Additional CSS classes to apply.
 */
type SelectProps = Omit<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  "onChange"
> & {
  label: string;
  id: string;
  options: SelectOption[];
  value: string | number;
  onChange: (value: string) => void; // Custom onChange handler
  required?: boolean;
  placeholder?: string; // Optional placeholder
};

/**
 * A styled wrapper around the native HTML `<select>` element.
 * Provides consistent styling with other form components and includes a label.
 *
 * @component
 * @param {SelectProps} props - Props for the Select component.
 * @example
 * const [algorithm, setAlgorithm] = useState('SVM');
 * const algoOptions = [
 *   { value: 'Random Forest', label: 'Random Forest' },
 *   { value: 'SVM', label: 'SVM' },
 * ];
 *
 * <Select
 *   id="algorithm-select"
 *   label="Algorithm"
 *   options={algoOptions}
 *   value={algorithm}
 *   onChange={setAlgorithm}
 *   required
 * />
 */
const Select: React.FC<SelectProps> = ({
  label,
  id,
  options,
  value,
  onChange,
  disabled = false,
  required = false,
  placeholder,
  className = "",
  ...props
}) => {
  return (
    <div className="w-full">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        required={required}
        className={`w-full rounded border-gray-300 shadow-sm text-sm px-4 py-2.5
          focus:ring-1 focus:ring-blue-500 focus:border-blue-500
          disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
          border ${className}`.trim()}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
