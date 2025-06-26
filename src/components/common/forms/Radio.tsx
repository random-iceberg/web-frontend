import React from "react";

interface RadioProps {
  label: string;
  id: string;
  name: string; // Name attribute for radio group
  checked: boolean;
  onChange: () => void; // No need to pass 'checked' back, as it's implied by the change
  disabled?: boolean;
  description?: string;
}

const Radio: React.FC<RadioProps> = ({
  label,
  id,
  name,
  checked,
  onChange,
  disabled = false,
  description,
}) => {
  const descriptionId = description ? `${id}-description` : undefined;
  return (
    <div className="flex items-start">
      <div className="flex h-5 items-center">
        <input
          type="radio"
          id={id}
          name={name}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className="h-4 w-4 rounded-full border-gray-300 text-primary focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
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

export default Radio;
