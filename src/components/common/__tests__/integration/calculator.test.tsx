jest.mock('axios', () => ({
  post: jest.fn(() => Promise.resolve({ data: { survived: true, probability: 0.85 } })),
}));

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../../../App';

describe('Calculator Integration Test', () => {
  it('should complete the prediction flow', async () => {
    render(<App />);
    
    // Navigate to calculator page
    userEvent.click(screen.getByRole('link', { name: /calculator/i }));

    // Wait for calculator form to be visible
    const calculatorForm = await screen.findByTestId('calculator-form');
    expect(calculatorForm).toBeInTheDocument();

    // Fill out dropdowns using buttons
    // Passenger Class
    await userEvent.click(screen.getByText('Passenger Class'));
    await userEvent.click(screen.getByRole('button', { name: '2' }));

    // Sex
    await userEvent.click(screen.getByText('Sex'));
    await userEvent.click(screen.getByRole('button', { name: 'female' }));

    // Embarkation Port
    await userEvent.click(screen.getByText('Embarkation Port'));
    await userEvent.click(screen.getByRole('button', { name: 'C' }));

    // Fill numeric inputs
    await userEvent.type(screen.getByLabelText('Age'), '28');
    await userEvent.type(screen.getByLabelText('Siblings/Spouses'), '1');
    await userEvent.type(screen.getByLabelText('Parents/Children'), '0');

    // Check checkboxes
    await userEvent.click(screen.getByText('Were they alone?'));
    await userEvent.click(screen.getByText('Cabin known?'));

    // Submit form
    await userEvent.click(screen.getByRole('button', { name: /predict/i }));

    // Verify results
    expect(await screen.findByText(/survived/i)).toBeInTheDocument();
    expect(screen.getByText(/probability/i)).toBeInTheDocument();
    expect(screen.getByText(/85.0%/)).toBeInTheDocument();
  });

  // Add test for form validation
  it('should show validation errors for missing required fields', async () => {
    render(<App />);
    userEvent.click(screen.getByRole('link', { name: /calculator/i }));
    
    // Try to submit without filling anything
    await userEvent.click(screen.getByRole('button', { name: /predict/i }));
    
    // Check for validation error
    expect(screen.getByText(/please select the passenger's gender/i)).toBeInTheDocument();
  });

  // Add test for reset functionality
  it('should reset form when clicking reset button', async () => {
    render(<App />);
    userEvent.click(screen.getByRole('link', { name: /calculator/i }));
    
    // Fill some fields
    await userEvent.type(screen.getByLabelText('Age'), '28');
    
    // Click reset
    await userEvent.click(screen.getByRole('button', { name: /reset/i }));
    
    // Verify fields are reset
    expect(screen.getByLabelText('Age')).toHaveValue(0);
  });
});