import React, { useState } from 'react';

type DropDownButtonProps = {
  label: string;
  children: React.ReactNode;
  id: string;
  /** Called when the user picks an option */
  onSelect: (value: string) => void;
};

type InputButtonProps = {
  label: string;
  id: string;
  /** Input `type`, e.g. "text" or "number" */
  type?: React.HTMLInputTypeAttribute;
  /** Current value */
  value: string;
  /** Called when the input changes */
  onChange: (value: string) => void;
};

type CheckboxProps = {
  label: string;
  id: string;
  /** Checked state */
  checked: boolean;
  /** Called when checkbox toggles */
  onChange: (value: boolean) => void;
};

export const DropDownButton: React.FC<DropDownButtonProps> = ({ label, children, id, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(label);

  function changeState() {
    setIsOpen(!isOpen);
  }

  const handleSelect = (value: string) => {
    setSelectedOption(value);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full max-w-sm">
      <span className="text-red-500 mr-1">*</span>
      <button
        type="button"
        id={id}
        onClick={changeState}
        className="w-full text-left bg-background text-foreground text-sm font-medium px-4 py-2 rounded-md shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {selectedOption}
      </button>

      {isOpen && (
        <div className="absolute left-0 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-md z-10">
          {React.Children.map(children, (child: any) => (
            <div
            onClick={() => {
              handleSelect(child.props.children);
              onSelect(child.props.children);
            }}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer text-sm font-medium"
            >
              {child}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const InputButton: React.FC<InputButtonProps> = ({ label, id, type = 'text', value, onChange }) => {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor={id}>
        {label}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      />
    </div>
  );
};

export const CheckBox: React.FC<CheckboxProps> = ({ label, id, checked, onChange}) => {
  return (
    <div className="mb-4">
      <label className="flex items-center space-x-2">
        <span className="text-foreground text-sm font-medium flex items-center">
          {label}
        </span>
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={e => onChange(e.target.checked)}
          className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
      </label>
    </div>
  );
};
