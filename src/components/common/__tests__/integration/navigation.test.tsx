import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../../../App';

describe('Navigation Integration Tests', () => {
  it('should display navigation links on landing page', () => {
    render(<App />);
    expect(screen.getByText(/calculator/i)).toBeInTheDocument();
    expect(screen.getByText(/admin console/i)).toBeInTheDocument();
  });

  it('should navigate to calculator page', async () => {
    render(<App />);
    const calculatorLink = screen.getByText(/calculator/i);
    userEvent.click(calculatorLink);
    expect(await screen.findByTestId('calculator-form')).toBeInTheDocument();
  });

  it('should navigate to admin console page', async () => {
    render(<App />);
    const adminLink = screen.getByText(/admin console/i);
    userEvent.click(adminLink);
    expect(await screen.findByTestId('admin-console')).toBeInTheDocument();
  });
});