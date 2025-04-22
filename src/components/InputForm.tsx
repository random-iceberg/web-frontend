import React, { useState } from 'react';

type DropDownButtonProps = {
  label: string;
  children: React.ReactNode;
  id: string;
};

type InputButtonProps = {
  label: string;
  id: string;
};

type CheckboxProps = {
  label: string;
  id: string;
};

export const DropDownButton: React.FC<DropDownButtonProps> = ({ label, children, id }) => {
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
      <label htmlFor={id} className="text-sm font-medium text-foreground">{label}</label>
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
              onClick={() => handleSelect(child.props.children)}
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

export const InputButton: React.FC<InputButtonProps> = ({ label, id }) => {
  return (
    <div className="mb-4">
      <label className="flex items-center mb-1 text-sm font-medium text-foreground" htmlFor={id}>
        <span className="text-red-500 mr-1">*</span>
        <span>{label}</span>
      </label>
      <input
        type="text"
        id={id}
        className="h-10 w-64 px-3 py-2 bg-background text-foreground border-2 rounded-md border-gray-300 border-opacity-50 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-sm"
        aria-required="true"
      />
    </div>
  );
};

export const CheckBox: React.FC<CheckboxProps> = ({ label, id }) => {
  return (
    <div className="mb-4">
      <label className="flex items-center space-x-2">
        <span className="text-foreground text-sm font-medium flex items-center">
          {label}
        </span>
        <input
          type="checkbox"
          id={id}
          className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
      </label>
    </div>
  );
};
