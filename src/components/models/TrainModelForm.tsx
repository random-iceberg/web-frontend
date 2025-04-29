import React, { useState } from "react";
import { trainModel, ModelCreateData } from "@/services/modelService";
import { useModelContext } from "@/components/context/ModelContext";
import axios from "axios";

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

  const handleAlgorithmChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, algorithm: e.target.value });
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, name: e.target.value });
  };

  const handleFeatureToggle = (featureId: string) => {
    const updatedFeatures = formData.features.includes(featureId)
      ? formData.features.filter((id) => id !== featureId)
      : [...formData.features, featureId];

    setFormData({ ...formData, features: updatedFeatures });
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
    } catch (err) {
      // TODO: Use errorService later
      console.error("Error training model:", err);

      // Provide more detailed error messages
      if (axios.isAxiosError(err)) {
        if (
          err.code === "ECONNREFUSED" ||
          err.message.includes("Network Error")
        ) {
          setError(
            "Cannot connect to the backend server. Please make sure it is running.",
          );
        } else if (err.response) {
          if (err.response.status === 404) {
            setError(
              "API endpoint not found. Please check the server configuration.",
            );
          } else {
            setError(
              `Server error: ${err.response.status} ${err.response.statusText}`,
            );
          }
        } else {
          setError("Failed to start model training. Please try again later.");
        }
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }
    } finally {
      setIsTraining(false);
    }
  };

  return (
    <form className="bg-gray-50 p-6 rounded-lg shadow" onSubmit={handleSubmit}>
      <div className="mb-6">
        <label
          htmlFor="model-name"
          className="block mb-2 font-medium text-gray-700"
        >
          Model Name:
        </label>
        <input
          id="model-name"
          type="text"
          value={formData.name}
          onChange={handleNameChange}
          placeholder="Enter a name for this model"
          disabled={isTraining}
          required
          className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:opacity-70"
        />
      </div>

      <div className="mb-6">
        <label
          htmlFor="algorithm"
          className="block mb-2 font-medium text-gray-700"
        >
          Algorithm:
        </label>
        <select
          id="algorithm"
          value={formData.algorithm}
          onChange={handleAlgorithmChange}
          disabled={isTraining}
          className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:opacity-70"
        >
          {ALGORITHMS.map((algo) => (
            <option key={algo} value={algo}>
              {algo}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <label className="block mb-2 font-medium text-gray-700">
          Features:
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {AVAILABLE_FEATURES.map((feature) => (
            <div key={feature.id} className="flex items-center">
              <input
                type="checkbox"
                id={`feature-${feature.id}`}
                checked={formData.features.includes(feature.id)}
                onChange={() => handleFeatureToggle(feature.id)}
                disabled={isTraining}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 disabled:opacity-70"
              />
              <label
                htmlFor={`feature-${feature.id}`}
                className="ml-2 text-gray-700"
              >
                {feature.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      {error && (
        <div className="mb-6 p-3 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      {success && (
        <div className="mb-6 p-3 bg-green-100 text-green-700 rounded">
          {success}
        </div>
      )}

      <button
        type="submit"
        className="w-full p-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
        disabled={isTraining}
      >
        {isTraining ? "Training..." : "Train Model"}
      </button>
    </form>
  );
};

export default TrainModelForm;
