import React, { useState, useEffect, useRef } from 'react';

type DropDownButtonProps = {
  label: string;
  children: React.ReactNode;
  id: string;
  value: string;
  onSelect: (value: string) => void;
  disabled?: boolean;
};

type InputButtonProps = {
  label: string;
  id: string;
  type?: 'text' | 'number';
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  min?: number;
  max?: number;
};

type CheckboxProps = {
  label: string;
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
};

export const DropDownButton: React.FC<DropDownButtonProps> = ({ 
  label, 
  children, 
  id, 
  value,
  onSelect,
  disabled = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <button
        type="button"
        id={id}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className="w-full text-left bg-white text-gray-900 text-sm px-4 py-2.5 rounded border border-gray-300 
          focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
          disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed"
      >
        {value || label}
      </button>

      {isOpen && (
        <div 
          role="listbox"
          className="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10"
        >
          {React.Children.map(children, (child: any) => (
            <div
              role="option"
              aria-selected={value === child.props.children}
              onClick={() => {
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

export const InputButton: React.FC<InputButtonProps> = ({
  label,
  id,
  type = 'text',
  value,
  onChange,
  disabled = false,
  min,
  max
}) => {
  return (
    <div className="w-full">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        min={min}
        max={max}
        className="w-full rounded border-gray-300 shadow-sm text-sm px-4 py-2.5 
          focus:ring-1 focus:ring-blue-500 focus:border-blue-500
          disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed"
        aria-label={label}
      />
    </div>
  );
};

export const CheckBox: React.FC<CheckboxProps> = ({
  label,
  id,
  checked,
  onChange,
  disabled = false
}) => {
  return (
    <div className="flex items-center space-x-3">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        className="h-4 w-4 rounded border-gray-300 text-blue-600 
          focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label={label}
      />
      <label 
        htmlFor={id}
        className={`text-sm font-medium ${disabled ? 'text-gray-500' : 'text-gray-700'}`}
      >
        {label}
      </label>
    </div>
  );
};