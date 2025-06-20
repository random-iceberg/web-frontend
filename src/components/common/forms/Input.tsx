import React from "react";

/**
 * Allowed types for the Input component.
 * @typedef {'text' | 'number' | 'password' | 'email'} InputType
 */
type InputType = "text" | "number" | "password" | "email";

/**
 * Props for the Input component.
 * @typedef {object} InputProps
 * @property {string} label - Text label displayed above the input.
 * @property {string} id - Unique ID for the input and linking label.
 * @property {InputType} [type='text'] - The type of the input field.
 * @property {string | number} value - The current value of the input.
 * @property {(value: string) => void} onChange - Callback function when the input value changes.
 * @property {boolean} [disabled=false] - Whether the input is disabled.
 * @property {number} [min] - Minimum value (for type='number').
 * @property {number} [max] - Maximum value (for type='number').
 * @property {string} [placeholder] - Placeholder text for the input.
 * @property {boolean} [required=false] - Whether the input is required.
 * @property {string} [description] - Optional description text displayed below the input.
 */
type InputProps = {
  label: string;
  id: string;
  type?: InputType; // Use defined type
  value: string | number; // Allow number type for value
  onChange: (value: string) => void;
  disabled?: boolean;
  min?: number;
  max?: number;
  step?: string | number; 
  placeholder?: string; // Added placeholder
  required?: boolean; // Added required attribute
  description?: string; // Optional description text
};

/**
 * A styled text/number/password/email input component with a label and optional description.
 * Wraps a standard HTML <input> element.
 *
 * @component
 * @param {InputProps} props - Props for the Input component.
 * @example
 * const [name, setName] = useState('');
 *
 * <Input
 *   id="user-name"
 *   label="Name"
 *   value={name}
 *   onChange={setName}
 *   placeholder="Enter your name"
 *   required
 *   description="Please enter your full name."
 * />
 *
 * @example
 * const [age, setAge] = useState(30);
 *
 * <Input
 *   id="user-age"
 *   label="Age"
 *   type="number"
 *   value={age}
 *   onChange={(val) => setAge(Number(val))} // Remember to handle type conversion if needed
 *   min={0}
 *   max={120}
 * />
 */
const Input: React.FC<InputProps> = ({
  label,
  id,
  type = "text",
  value,
  onChange,
  disabled = false,
  min,
  max,
  step,
  placeholder,
  required = false,
  description,
}) => {
  const descriptionId = description ? `${id}-description` : undefined;
  return (
    <div className="w-full">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}{" "}
        {/* Indicate required fields */}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        min={min}
        max={max}
        step={step}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed"
        aria-label={label}
        aria-required={required}
        aria-describedby={descriptionId}
      />
      {description && (
        <p id={descriptionId} className="mt-2 text-sm text-gray-600">
          {description}
        </p>
      )}
    </div>
  );
};

export default Input; // Exporting as Input
