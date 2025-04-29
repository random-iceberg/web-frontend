import React, { useEffect, useState } from "react";
import { ModelProvider } from "@/components/context/ModelContext";
import ModelList from "@/components/models/ModelList";
import TrainModelForm from "@/components/models/TrainModelForm";

const AdminConsole: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <ModelProvider>

      <div
        className={`max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 transition-opacity duration-500 ease-in ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Admin Console
          </h1>
          <p className="text-lg text-gray-600">
            Manage prediction models: train new models or remove existing ones.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">

          <div className="w-full lg:w-1/3 bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
              Train New Model
            </h2>
            <TrainModelForm />
          </div>

          <div className="w-full lg:w-2/3 bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
              Available Models
            </h2>
            <ModelList />
          </div>
        </div>
      </div>
    </ModelProvider>
  );
};

export default AdminConsole;
