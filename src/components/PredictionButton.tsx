import React from 'react';

const PredictionButton: React.FC = () => {
  const handleClick = () => {
    console.log("Clicked!");
  };

  return (
    <button 
      onClick={handleClick}
      className="bg-background hover:bg-blue-400 text-foreground font-bold py-4 px-12 text-xl border-b-4 border-blue-700 hover:border-blue-500 rounded"
    >
      Predict
    </button>
  );
};

export default PredictionButton;
