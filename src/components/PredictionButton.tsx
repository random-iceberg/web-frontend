import React from 'react';

type PredictionButtonProps = {
  onClick: () => void; // Function that takes no arguments and returns nothing
}

const PredictionButton: React.FC<PredictionButtonProps> = ({ onClick }) => {  
  return (
    <button 
      type="button"
      onClick={onClick}
      className="bg-background hover:bg-blue-400 text-foreground font-bold py-4 px-12 text-xl border-b-4 border-blue-700 hover:border-blue-500 rounded"
    >
      Predict
    </button>
  );
};

export default PredictionButton;
