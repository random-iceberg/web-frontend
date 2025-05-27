import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from '../../../../App';

describe('Navigation Integration Tests', () => {
  it('should display navigation links on landing page', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    expect(screen.getByText(/calculator/i)).toBeInTheDocument();
    expect(screen.getByText(/admin console/i)).toBeInTheDocument();
  });

  it('should navigate to calculator page', async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    const calculatorLink = screen.getByText(/calculator/i);
    await userEvent.click(calculatorLink);
    
    expect(screen.getByTestId('calculator-form')).toBeInTheDocument();
  });

  it('should navigate to admin console page', async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    const adminLink = screen.getByText(/admin console/i);
    await userEvent.click(adminLink);
    
    expect(screen.getByTestId('admin-console')).toBeInTheDocument();
  });
});