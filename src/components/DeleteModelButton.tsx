import React, { useState } from 'react';
import { deleteModel } from '../services/modelService';

interface DeleteModelButtonProps {
  modelId: string;
  modelName: string;
  onDelete: () => Promise<void>;
}

const DeleteModelButton: React.FC<DeleteModelButtonProps> = ({ modelId, modelName, onDelete }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDeleteClick = () => {
    setShowConfirm(true);
  };

  const handleCancelDelete = () => {
    setShowConfirm(false);
    setError(null);
  };

  const handleConfirmDelete = async () => {
    try {
      setIsDeleting(true);
      setError(null);
      await deleteModel(modelId);
      setShowConfirm(false);
      await onDelete();
    } catch (err) {
      setError('Failed to delete model. Please try again.');
      console.error('Error deleting model:', err);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div>
      {!showConfirm ? (
        <button 
          className="px-2 py-1 text-sm bg-red-100 text-red-700 border border-red-200 rounded hover:bg-red-200 transition-colors"
          onClick={handleDeleteClick}
          aria-label={`Delete model ${modelName}`}
        >
          Delete
        </button>
      ) : (
        <div className="bg-red-50 border border-red-200 rounded p-2">
          <p className="text-red-700 text-sm mb-2">Delete "{modelName}"?</p>
          <div className="flex space-x-2">
            <button 
              className="px-2 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              onClick={handleConfirmDelete}
              disabled={isDeleting}
            >
              {isDeleting ? 'Deleting...' : 'Yes, Delete'}
            </button>
            <button 
              className="px-2 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              onClick={handleCancelDelete}
              disabled={isDeleting}
            >
              Cancel
            </button>
          </div>
          {error && <p className="text-red-700 text-xs mt-2">{error}</p>}
        </div>
      )}
    </div>
  );
};

export default DeleteModelButton;
