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

  return (
    <div className="relative w-full">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <button
        type="button"
        id={id}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left bg-white text-gray-900 text-sm px-4 py-2.5 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
      >
        {selectedOption}
      </button>

      {isOpen && (
        <div className="absolute mt-1 max-w-full w-[200px] bg-white border border-gray-300 rounded-md shadow-lg z-10">
          {React.Children.map(children, (child: any) => (
            <div
              onClick={() => {
                setSelectedOption(child.props.children);
                onSelect(child.props.children);
                setIsOpen(false);
              }}
              className="px-4 py-2.5 hover:bg-gray-50 cursor-pointer text-sm text-gray-700"
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
      <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor={id}>
        {label}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="block w-full rounded border-gray-300 shadow-sm text-sm px-4 py-2.5 
          focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
};

export const CheckBox: React.FC<CheckboxProps> = ({ label, id, checked, onChange }) => {
  return (
    <div className="flex items-center space-x-3">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={e => onChange(e.target.checked)}
        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
      />
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
      </label>
    </div>
  );
};