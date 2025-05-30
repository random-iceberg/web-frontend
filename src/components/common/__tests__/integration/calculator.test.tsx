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
    await userEvent.click(screen.getByRole('link', { name: /survival calculator/i }));

    // Wait for calculator form to be visible
    const calculatorForm = await screen.findByTestId('calculator-form');
    expect(calculatorForm).toBeInTheDocument();

    // Fill out dropdowns using buttons
    // Passenger Class
    const passengerClassDropdown = screen.getByRole('button', { name: /passenger class/i });
    await userEvent.click(passengerClassDropdown);
    
    // Debug what's available in the DOM
    screen.debug();
    
    // Add a small delay to allow dropdown to open
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Try different ways to find the button
    const option2 = await screen.findByText('2');
    await userEvent.click(option2);

    // Sex
    const sexDropdown = screen.getByRole('button', { name: /sex/i });
    await userEvent.click(sexDropdown);
    await new Promise(resolve => setTimeout(resolve, 100));
    const optionFemale = await screen.findByText('female');
    await userEvent.click(optionFemale);

    // Embarkation Port
    const portDropdown = screen.getByRole('button', { name: /embarkation port/i });
    await userEvent.click(portDropdown);
    await new Promise(resolve => setTimeout(resolve, 100));
    const optionC = await screen.findByText('C');
    await userEvent.click(optionC);

    // Fill numeric inputs
    await userEvent.type(screen.getByRole('spinbutton', { name: /age/i }), '28');
    await userEvent.type(screen.getByRole('spinbutton', { name: /siblings\/spouses/i }), '1');
    await userEvent.type(screen.getByRole('spinbutton', { name: /parents\/children/i }), '0');

    // Check checkboxes
    await userEvent.click(screen.getByRole('checkbox', { name: /were they alone/i }));
    await userEvent.click(screen.getByRole('checkbox', { name: /cabin known/i }));

    // Submit form
    await userEvent.click(screen.getByRole('button', { name: /predict/i }));

    // Verify results - updated to match the actual text in the component
    const resultText = await screen.findByText(/survived/i, { exact: false });
    expect(resultText).toBeInTheDocument();
    
    // Check for probability text which includes the percentage
    const probabilityText = await screen.findByText(/probability: 85.0%/i);
    expect(probabilityText).toBeInTheDocument();
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