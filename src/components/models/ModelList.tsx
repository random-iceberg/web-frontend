import React from "react";
import { useModelContext } from "../context/ModelContext"; 
import ModelItem from "../models/ModelItem"; 

const ModelList: React.FC = () => {
  const { models, loading, error, refreshModels } = useModelContext();

  if (loading) {
    return (
      <div className="p-8 text-center bg-gray-50 rounded-lg">
        Loading models...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center bg-red-50 rounded-lg">
        <p className="text-red-700 mb-4">{error}</p>
        <button
          onClick={refreshModels}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (models.length === 0) {
    return (
      <div className="p-8 text-center bg-gray-50 rounded-lg">
        No models available. Train a new model to get started.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {models.map((model) => (
        <ModelItem key={model.id} model={model} onDelete={refreshModels} />
      ))}
    </div>
  );
};

export default ModelList;
