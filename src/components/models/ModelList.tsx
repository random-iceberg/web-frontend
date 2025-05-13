import React from "react";
import { useModelContext } from "components/context/ModelContext";
import ModelItem from "components/models/ModelItem";
import Alert from "components/common/Alert"; // Import common Alert
import Button from "components/common/Button"; // Import common Button

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
      <Alert variant="error" title="Error Loading Models" className="text-center">
        <p className="mb-4">{error}</p>
        <Button
          onClick={refreshModels}
          variant="secondary" // Or "danger" if preferred for error contexts
          size="md"
        >
          Try Again
        </Button>
      </Alert>
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
