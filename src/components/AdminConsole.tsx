// app/frontend/src/components/AdminConsole.tsx
import React from 'react';
import { ModelProvider } from './context/ModelContext';
import ModelList from './ModelList';
import TrainModelForm from './TrainModelForm';

const AdminConsole: React.FC = () => {
  return (
    <ModelProvider>
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Admin Console</h1>
        <p className="text-gray-600 mb-8">
          Manage Prediction models, Train new models with selected features 
          or remove existing models.
        </p>
        
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/3">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Train New Model</h2>
            <TrainModelForm />
          </div>
          
          <div className="w-full md:w-2/3">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Available Models</h2>
            <ModelList />
          </div>
        </div>
      </div>
    </ModelProvider>
  );
};

export default AdminConsole;
