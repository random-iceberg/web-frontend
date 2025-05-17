import React from "react";

/**
 * Props for the Checkbox component.
 * @typedef {object} CheckboxProps
 * @property {string} label - Text label displayed next to the checkbox.
 * @property {string} id - Unique ID for the checkbox input and linking label.
 * @property {boolean} checked - Whether the checkbox is currently checked.
 * @property {(checked: boolean) => void} onChange - Callback function when the checkbox state changes.
 * @property {boolean} [disabled=false] - Whether the checkbox is disabled.
 * @property {string} [description] - Optional description text displayed below the label.
 */
type CheckboxProps = {
  label: string;
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  description?: string; // Optional description text
};

/**
 * A styled checkbox input component with a label and optional description.
 *
 * @component
 * @param {CheckboxProps} props - Props for the Checkbox component.
 * @example
 * const [isChecked, setIsChecked] = useState(false);
 *
 * <Checkbox
 *   id="agree"
 *   label="I agree to the terms"
 *   checked={isChecked}
 *   onChange={setIsChecked}
 *   description="Please read the terms carefully."
 * />
 */
const Checkbox: React.FC<CheckboxProps> = ({
  label,
  id,
  checked,
  onChange,
  disabled = false,
  description,
}) => {
  const descriptionId = description ? `${id}-description` : undefined;
  return (
    <div className="flex items-start">
      {" "}
      {/* Changed to items-start for better alignment with description */}
      <div className="flex h-5 items-center">
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
          aria-describedby={descriptionId}
        />
      </div>
      <div className="ml-3 text-base">
        <label
          htmlFor={id}
          className={`font-medium ${disabled ? "text-gray-500" : "text-gray-700"}`}
        >
          {label}
        </label>
        {description && (
          <p id={descriptionId} className="mt-1 text-sm text-gray-600">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default Checkbox; // Exporting as Checkbox
