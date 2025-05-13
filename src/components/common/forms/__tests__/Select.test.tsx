import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Select from '../Select';

describe('Select Component', () => {
  const mockOnChange = jest.fn();
  const sampleOptions = [
    { value: 'opt1', label: 'Option 1' },
    { value: 'opt2', label: 'Option 2' },
    { value: 'opt3', label: 'Option 3' },
  ];

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it('renders correctly with basic props', () => {
    const { asFragment } = render(
      <Select
        id="test-select"
        label="Test Select"
        options={sampleOptions}
        value="opt1"
        onChange={mockOnChange}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders correctly with a different selected value', () => {
    const { asFragment } = render(
      <Select
        id="test-select"
        label="Test Select"
        options={sampleOptions}
        value="opt3"
        onChange={mockOnChange}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders correctly when disabled', () => {
    const { asFragment } = render(
      <Select
        id="test-select"
        label="Test Select"
        options={sampleOptions}
        value="opt1"
        onChange={mockOnChange}
        disabled
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders correctly when required', () => {
    const { asFragment } = render(
      <Select
        id="test-select"
        label="Test Select"
        options={sampleOptions}
        value="opt1"
        onChange={mockOnChange}
        required
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders with a placeholder', () => {
    const { asFragment } = render(
      <Select
        id="test-select"
        label="Test Select"
        options={sampleOptions}
        value="" // No value selected to show placeholder
        onChange={mockOnChange}
        placeholder="-- Select an Option --"
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('calls onChange handler when selection changes', () => {
    const { getByLabelText } = render(
      <Select
        id="test-select"
        label="Test Select"
        options={sampleOptions}
        value="opt1"
        onChange={mockOnChange}
      />
    );
    const selectElement = getByLabelText('Test Select') as HTMLSelectElement;
    fireEvent.change(selectElement, { target: { value: 'opt2' } });
    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledWith('opt2');
  });

  it('does not call onChange handler when disabled and selection changes', () => {
    const { getByLabelText } = render(
      <Select
        id="test-select"
        label="Test Select"
        options={sampleOptions}
        value="opt1"
        onChange={mockOnChange}
        disabled
      />
    );
    const selectElement = getByLabelText('Test Select') as HTMLSelectElement;
    // Attempt to change, though it shouldn't work for disabled inputs
    try {
        fireEvent.change(selectElement, { target: { value: 'opt2' } });
    } catch (e) {
        // Some testing environments might throw
    }
    expect(mockOnChange).not.toHaveBeenCalled();
  });
});
