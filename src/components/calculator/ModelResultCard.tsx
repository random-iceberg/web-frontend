import React from "react";
import Card from "components/common/Card";
import { PredictionResult } from "services/predictionService";

interface ModelResultCardProps {
  modelId: string;
  modelName: string;
  algorithm: string;
  result: PredictionResult | { error: string };
}

export default function ModelResultCard({
  modelName,
  algorithm,
  result,
}: ModelResultCardProps) {
  const isError = "error" in result;
  const survived = !isError && result.survived;
  const probability = !isError ? (result.probability * 100).toFixed(1) : "N/A";

  const cardClasses = `p-4 rounded-lg ${
    isError
      ? "bg-gray-100 border border-gray-300 text-gray-700"
      : survived
        ? "bg-green-100 border border-green-300 text-green-800"
        : "bg-red-100 border border-red-300 text-red-800"
  }`;

  return (
    <Card className={cardClasses}>
      <h3 className="text-lg font-semibold">Model:</h3> {modelName}
      <h3 className="text-lg font-semibold">Algorithm:</h3> {algorithm}
      {isError ? (
        <p className="text-sm">Error: {result.error}</p>
      ) : (
        <>
          <h3 className="text-m font-semibold">Status:</h3>
          {survived ? "Survived" : "Did not survive"}
          <p className="text-sm mt-1">Probability: {probability}%</p>
        </>
      )}
    </Card>
  );
}
