import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../../../App';

// Update mock to include all required model properties
jest.mock('services/modelService', () => ({
  trainModel: jest.fn(() => Promise.resolve({ 
    id: 'test-model-1',
    name: 'Test Model',
    created_at: '2024-05-30T10:00:00Z',
    accuracy: 0.85,
    algorithm: 'Random Forest',
    features: ['age', 'sex', 'class']
  })),
  deleteModel: jest.fn(() => Promise.resolve()),
  getModels: jest.fn(() => Promise.resolve([{
    id: 'existing-model-1',
    name: 'Existing Model',
    created_at: '2024-05-29T10:00:00Z',
    accuracy: 0.82,
    algorithm: 'Random Forest',
    features: ['age', 'sex', 'class']
  }]))
}));

describe('Admin Console Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should train a new model successfully', async () => {
    render(<App />);
    
    // Navigate and wait for load
    await userEvent.click(screen.getByRole('link', { name: /admin console/i }));
    await screen.findByTestId('admin-console');

    // Select algorithm and fill form
    const algorithmSelect = screen.getByLabelText(/algorithm/i);
    await userEvent.selectOptions(algorithmSelect, ['Random Forest']);
    
    // Fill required fields
    await userEvent.type(screen.getByLabelText(/model name/i), 'Test Model');
    
    // Select features (checkboxes)
    await userEvent.click(screen.getByLabelText(/passenger class/i));
    await userEvent.click(screen.getByLabelText(/sex/i));
    await userEvent.click(screen.getByLabelText(/age/i));

    // Submit form
    const trainButton = screen.getByRole('button', { name: /train model/i });
    await userEvent.click(trainButton);

    // Verify results with proper waitFor
    await waitFor(() => {
      expect(screen.getByText(/model trained successfully/i)).toBeInTheDocument();
    }, { timeout: 3000 });

    // Check if new model appears
    await waitFor(() => {
      const modelElement = screen.getByText(/test model/i);
      expect(modelElement).toBeInTheDocument();
      expect(screen.getByText(/85%/)).toBeInTheDocument();
    });
  });

  it('should delete an existing model', async () => {
    render(<App />);
    
    await userEvent.click(screen.getByRole('link', { name: /admin console/i }));
    await screen.findByTestId('admin-console');

    // Wait for models to load
    const existingModel = await screen.findByText(/existing model/i);
    expect(existingModel).toBeInTheDocument();

    // Find delete button by its accessible name
    const deleteButton = screen.getByRole('button', { 
      name: /delete.*existing model/i 
    });
    await userEvent.click(deleteButton);

    // Handle confirmation modal
    const confirmButton = await screen.findByRole('button', { 
      name: /confirm/i 
    });
    await userEvent.click(confirmButton);

    // Verify deletion
    await waitFor(() => {
      expect(screen.queryByText(/existing model/i)).not.toBeInTheDocument();
    });
  });
});