import React, { useState } from 'react';

type DropDownButtonProps = {
  label: string;
  children: React.ReactNode;
};

export const DropDownButton: React.FC<DropDownButtonProps> = ({ label, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(label);

    function changeState() {
        setIsOpen(!isOpen);
    }

    const handleSelect = (value: string) => {
        setSelectedOption(value);
        setIsOpen(false);
    }

    return (
        <div className="relative inline-block w-full max-w-sm group"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}>
            <button
                onClick={changeState}
                className="w-full text-left border border-gray-300 bg-white text-gray-700 text-lg px-4 py-2 rounded-lg shadow-sm focus:outline-none"
            >
                {selectedOption}
            </button>

            <div className="absolute w-full mt-1 rounded-lg bg-white border border-gray-300 shadow-md scale-y-0 group-hover:scale-y-100 group-focus-within:scale-y-100 origin-top transition-transform duration-200 z-10">
                <div className="flex flex-col">
                    {React.Children.map(children, (child: any) => {
                        return (
                            <div
                                onClick={() => handleSelect(child.props.children)}
                                className="w-full px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer"
                            >
                                {child}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export const InputButton: React.FC = () => {
    return (    
      <div className="flex justify-center items-center">
          <label className='relative'>
              <input type='text' className='h-10 w-64 text-base bg-white border-2 rounded-md border-black border-opacity-50 outline-none focus:border-blue-500 focus:text-black px-3 py-2'/>
              <span className='text-base text-black text-opacity-80 absolute left-0 top-2 mx-3 px-1'></span>
          </label>
      </div>
    );
  };