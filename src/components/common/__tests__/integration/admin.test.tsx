import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../../../App';

// Mock the API calls
jest.mock('services/modelService', () => ({
  trainModel: jest.fn(() => Promise.resolve({ 
    id: 'test-model-1',
    createdAt: '2024-05-30T10:00:00Z',
    accuracy: 0.85
  })),
  deleteModel: jest.fn(() => Promise.resolve()),
  getModels: jest.fn(() => Promise.resolve([
    {
      id: 'existing-model-1',
      createdAt: '2024-05-29T10:00:00Z',
      accuracy: 0.82
    }
  ]))
}));

describe('Admin Console Integration Tests', () => {
  beforeEach(() => {
    // Clear mocks before each test
    jest.clearAllMocks();
  });

  it('should train a new model successfully', async () => {
    render(<App />);

    // Navigate to admin console
    await userEvent.click(screen.getByRole('link', { name: /admin console/i }));
    
    // Wait for admin console to load
    const adminConsole = await screen.findByTestId('admin-console');
    expect(adminConsole).toBeInTheDocument();

    // Find and fill the training form
    const epochsInput = screen.getByRole('spinbutton', { name: /epochs/i });
    const batchSizeInput = screen.getByRole('spinbutton', { name: /batch size/i });
    
    await userEvent.clear(epochsInput);
    await userEvent.type(epochsInput, '10');
    await userEvent.clear(batchSizeInput);
    await userEvent.type(batchSizeInput, '32');

    // Submit the form
    const trainButton = screen.getByRole('button', { name: /train model/i });
    await userEvent.click(trainButton);

    // Verify success message
    await waitFor(() => {
      expect(screen.getByText(/model trained successfully/i)).toBeInTheDocument();
    });

    // Verify new model appears in the list
    await waitFor(() => {
      expect(screen.getByText(/test-model-1/i)).toBeInTheDocument();
      expect(screen.getByText(/85%/)).toBeInTheDocument();
    });
  });

  it('should delete an existing model', async () => {
    render(<App />);

    // Navigate to admin console
    await userEvent.click(screen.getByRole('link', { name: /admin console/i }));
    
    // Wait for models to load
    await waitFor(() => {
      expect(screen.getByText(/existing-model-1/i)).toBeInTheDocument();
    });

    // Find and click delete button for the model
    const deleteButton = screen.getByRole('button', { 
      name: /delete model existing-model-1/i 
    });
    await userEvent.click(deleteButton);

    // Confirm deletion in the modal
    const confirmButton = await screen.findByRole('button', { 
      name: /confirm delete/i 
    });
    await userEvent.click(confirmButton);

    // Verify success message
    await waitFor(() => {
      expect(screen.getByText(/model deleted successfully/i)).toBeInTheDocument();
    });

    // Verify model is removed from the list
    await waitFor(() => {
      expect(screen.queryByText(/existing-model-1/i)).not.toBeInTheDocument();
    });
  });

  it('should handle training errors gracefully', async () => {
    // Mock training failure
    const modelService = require('services/modelService');
    modelService.trainModel.mockRejectedValueOnce(new Error('Training failed'));

    render(<App />);
    await userEvent.click(screen.getByRole('link', { name: /admin console/i }));
    
    // Fill and submit form
    const epochsInput = screen.getByRole('spinbutton', { name: /epochs/i });
    await userEvent.clear(epochsInput);
    await userEvent.type(epochsInput, '10');
    
    const trainButton = screen.getByRole('button', { name: /train model/i });
    await userEvent.click(trainButton);

    // Verify error message
    await waitFor(() => {
      expect(screen.getByText(/error training model/i)).toBeInTheDocument();
    });
  });

  it('should validate form inputs before training', async () => {
    render(<App />);
    await userEvent.click(screen.getByRole('link', { name: /admin console/i }));
    
    // Try to submit with invalid values
    const epochsInput = screen.getByRole('spinbutton', { name: /epochs/i });
    await userEvent.clear(epochsInput);
    await userEvent.type(epochsInput, '0');
    
    const trainButton = screen.getByRole('button', { name: /train model/i });
    await userEvent.click(trainButton);

    // Verify validation message
    expect(screen.getByText(/epochs must be greater than 0/i)).toBeInTheDocument();
  });
});