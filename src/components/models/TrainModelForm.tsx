import React, { useState } from "react";
import { trainModel, ModelCreateData } from "services/modelService";
import { useModelContext } from "components/context/ModelContext";
import { handleApiError } from "services/errorService";

// Common Components
import Card from "components/common/Card";
import Input from "components/common/forms/Input";
import Select from "components/common/forms/Select";
import Checkbox from "components/common/forms/Checkbox";
import Button from "components/common/Button";
import Alert from "components/common/Alert";

// Available algorithms for model training
const ALGORITHMS = [
  "Random Forest",
  "SVM",
  "Logistic Regression",
  "Decision Tree",
];

// TODO: Available features for selection, Update later with actual models
const AVAILABLE_FEATURES = [
  { id: "pclass", label: "Passenger Class" },
  { id: "sex", label: "Sex" },
  { id: "age", label: "Age" },
  { id: "sibsp", label: "Siblings/Spouses" },
  { id: "parch", label: "Parents/Children" },
  { id: "fare", label: "Fare" },
  { id: "embarked", label: "Embarked" },
  { id: "title", label: "Title" },
];

const TrainModelForm: React.FC = () => {
  const { refreshModels } = useModelContext();
  const [formData, setFormData] = useState<ModelCreateData>({
    algorithm: ALGORITHMS[0],
    name: "",
    features: [],
  });
  const [isTraining, setIsTraining] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAlgorithmChange = (value: string) => {
    // Changed to match Select component's onChange
    setFormData({ ...formData, algorithm: value });
  };

  const handleNameChange = (value: string) => {
    // Changed to match Input component's onChange
    setFormData({ ...formData, name: value });
  };

  const handleFeatureToggle = (featureId: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      features: prevFormData.features.includes(featureId)
        ? prevFormData.features.filter((id) => id !== featureId)
        : [...prevFormData.features, featureId],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!formData.name.trim()) {
      setError("Please enter a model name");
      return;
    }

    if (formData.features.length === 0) {
      setError("Please select at least one feature");
      return;
    }

    try {
      setIsTraining(true);
      setError(null);
      setSuccess(null);

      const response = await trainModel(formData);

      setSuccess(`Training started: ${response.message}`);
      setFormData({
        algorithm: ALGORITHMS[0],
        name: "",
        features: [],
      });

      // Refresh the model list after a short delay to allow the backend to create the model
      setTimeout(() => {
        refreshModels();
      }, 1000);
    } catch (err: any) {
      setError(handleApiError(err, "training the model"));
    } finally {
      setIsTraining(false);
    }
  };

  const algorithmOptions = ALGORITHMS.map((algo) => ({
    value: algo,
    label: algo,
  }));

  return (
    <Card className="p-6 frosted-glass">
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          id="model-name"
          label="Model Name:"
          type="text"
          value={formData.name}
          onChange={handleNameChange}
          placeholder="Enter a name for this model"
          disabled={isTraining}
          required
        />

        <Select
          id="algorithm"
          label="Algorithm:"
          value={formData.algorithm}
          onChange={handleAlgorithmChange}
          options={algorithmOptions}
          disabled={isTraining}
          required
        />

        <div>
          <label className="block mb-2 text-base font-medium text-gray-700">
            Features:
          </label>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4 p-4 border border-gray-300 rounded-md bg-white">
            {AVAILABLE_FEATURES.map((feature) => (
              <Checkbox
                key={feature.id}
                id={`feature-${feature.id}`}
                label={feature.label}
                checked={formData.features.includes(feature.id)}
                onChange={() => handleFeatureToggle(feature.id)}
                disabled={isTraining}
              />
            ))}
          </div>
        </div>

        {error && (
          <Alert variant="error" title="Training Error">
            {error}
          </Alert>
        )}

        {success && (
          <Alert variant="success" title="Training Status">
            {success}
          </Alert>
        )}

        <Button type="submit" variant="primary" fullWidth disabled={isTraining}>
          {isTraining ? "Training..." : "Train Model"}
        </Button>
      </form>
    </Card>
  );
};

export default TrainModelForm;
