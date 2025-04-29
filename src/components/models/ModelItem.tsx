import React, { useState } from "react";
import { Model } from "@/services/modelService";
import DeleteModelButton from "@/components/models/DeleteModelButton";

interface ModelItemProps {
  model: Model;
  onDelete: () => Promise<void>;
}

const ModelItem: React.FC<ModelItemProps> = ({ model, onDelete }) => {
  const [expanded, setExpanded] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-medium">{model.name}</h3>
        <div className="flex space-x-2">
          <button
            className="px-2 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300 transition-colors"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Hide Details" : "Show Details"}
          </button>
          <DeleteModelButton
            modelId={model.id}
            modelName={model.name}
            onDelete={onDelete}
          />
        </div>
      </div>

      <div className="flex items-center space-x-4 mb-2">
        <span className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded">
          {model.algorithm}
        </span>
        {model.accuracy !== null ? (
          <span className="text-green-700 font-medium">
            Accuracy: {(model.accuracy * 100).toFixed(2)}%
          </span>
        ) : (
          <span className="text-orange-500 italic">
            Training in progress...
          </span>
        )}
      </div>

      {expanded && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p>
            <span className="font-medium">Created:</span>{" "}
            {formatDate(model.created_at)}
          </p>
          <div className="mt-2">
            <span className="font-medium">Features:</span>
            <ul className="mt-1 ml-4 flex flex-wrap gap-2">
              {model.features.map((feature) => (
                <li
                  key={feature}
                  className="bg-gray-100 px-2 py-1 rounded text-sm"
                >
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

// Apply React.memo for performance optimization
export default React.memo(ModelItem);
