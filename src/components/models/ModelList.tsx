import React from "react";
import { useModelContext } from "components/context/ModelContext";
import ModelItem from "components/models/ModelItem";
import Alert from "components/common/Alert";
import Button from "components/common/Button";
import LoadingState from "components/common/LoadingState";
import EmptyState from "components/common/EmptyState";

const ModelList: React.FC = () => {
  const { models, loading, error, refreshModels } = useModelContext();

  if (loading) {
    return <LoadingState message="Loading models..." />;
  }

  if (error) {
    return (
      <Alert
        variant="error"
        title="Error Loading Models"
        className="text-center"
      >
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
      <EmptyState message="No models available. Train a new model to get started." />
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
