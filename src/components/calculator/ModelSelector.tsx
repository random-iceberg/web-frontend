import React, { useEffect, useState } from "react";
import { fetchModels, Model } from "services/modelService";
import { useAuth } from "providers/authProvider";
import Checkbox from "components/common/forms/Checkbox";
import Radio from "components/common/forms/Radio"; // Import the new Radio component
import Alert from "components/common/Alert";
import LoadingState from "components/common/LoadingState";
import EmptyState from "components/common/EmptyState";

interface ModelSelectorProps {
  onModelSelect: (selectedModelIds: string[]) => void;
  selectedModelIds: string[];
}

const ModelSelector: React.FC<ModelSelectorProps> = ({
  onModelSelect,
  selectedModelIds,
}) => {
  const { role } = useAuth();
  const [models, setModels] = useState<Model[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getModels = async () => {
      try {
        const fetchedModels = await fetchModels();
        setModels(fetchedModels);
      } catch (err: any) {
        setError(err.message || "Failed to fetch models.");
      } finally {
        setLoading(false);
      }
    };
    getModels();
  }, []);

  const handleCheckboxChange = (modelId: string, isChecked: boolean) => {
    if (isChecked) {
      onModelSelect([...selectedModelIds, modelId]);
    } else {
      onModelSelect(selectedModelIds.filter((id) => id !== modelId));
    }
  };

  const handleRadioChange = (modelId: string) => {
    onModelSelect([modelId]);
  };

  const isAnon = role === "anon";
  const filteredModels = isAnon
    ? models.filter(
        (model) => model.algorithm === "Random Forest" || model.algorithm === "SVM",
      )
    : models;

  if (loading) {
    return <LoadingState message="Loading models..." />;
  }

  if (error) {
    return <Alert variant="error">{error}</Alert>;
  }

  if (filteredModels.length === 0) {
    return <EmptyState message="No models available." />;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-700">
        Select Prediction Model(s)
      </h3>
      <div className="grid grid-cols-1 gap-3">
        {filteredModels.map((model) => (
          <div
            key={model.id}
            className="flex items-center p-3 border border-gray-200 rounded-md shadow-sm bg-white"
          >
            {isAnon ? (
              <Radio
                id={`model-radio-${model.id}`}
                name="selectedModel"
                checked={selectedModelIds.includes(model.id)}
                onChange={() => handleRadioChange(model.id)}
                label={`${model.name} (${model.algorithm})`}
              />
            ) : (
              <Checkbox
                id={`model-checkbox-${model.id}`}
                checked={selectedModelIds.includes(model.id)}
                onChange={(isChecked) =>
                  handleCheckboxChange(model.id, isChecked)
                }
                label={`${model.name} (${model.algorithm})`}
              />
            )}
            <span className="text-sm text-gray-600 ml-2">
              Accuracy: {model.accuracy ? `${(model.accuracy * 100).toFixed(1)}%` : "N/A"}
            </span>
          </div>
        ))}
      </div>
      {isAnon && (
        <p className="text-sm text-gray-500 mt-2">
          As an anonymous user, you can only select one model from the available
          options.
        </p>
      )}
    </div>
  );
};

export default ModelSelector;
