import React, { useState } from "react";
import { deleteModel } from "services/modelService";
import Button from "components/common/Button";
import Alert from "components/common/Alert";
interface DeleteModelButtonProps {
  modelId: string;
  modelName: string;
  onDelete: () => Promise<void>;
}

const DeleteModelButton: React.FC<DeleteModelButtonProps> = ({
  modelId,
  modelName,
  onDelete,
}) => {
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
      // TODO: Use errorService later, very very tired right now, no energy
      setError("Failed to delete model. Please try again.");
      console.error("Error deleting model:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="relative">
      {" "}
      {/* Added relative for potential absolute positioning of confirm dialog if needed later */}
      {!showConfirm ? (
        <Button
          variant="danger" // Using danger variant, could be an outline variant if required? Maybe Later
          size="sm"
          onClick={handleDeleteClick}
          aria-label={`Delete model ${modelName}`}
          className="border border-red-300 bg-red-50 text-red-700 hover:bg-red-100 focus:ring-red-500" // Customizing danger to be less prominent initially
        >
          Delete
        </Button>
      ) : (
        // Consider a modal or popover for better UX, but for now, inline confirmation. In later iterations if required by Lead
        <div className="p-3 border border-red-300 rounded-md shadow-lg bg-white absolute right-0 mt-1 z-10 w-64">
          {" "}
          {/* Basic popover style */}
          <p className="text-sm text-gray-700 mb-3">
            Are you sure you want to delete "{modelName}"? This action cannot be
            undone.
          </p>
          <div className="flex justify-end space-x-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={handleCancelDelete}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={handleConfirmDelete}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Yes, Delete"}
            </Button>
          </div>
          {error && (
            <Alert variant="error" className="mt-3 text-xs p-2">
              {" "}
              {/* Smaller alert */}
              {error}
            </Alert>
          )}
        </div>
      )}
    </div>
  );
};

export default DeleteModelButton;
