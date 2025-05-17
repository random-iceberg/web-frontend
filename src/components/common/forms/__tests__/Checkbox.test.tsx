import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Checkbox from "../Checkbox";

describe("Checkbox Component", () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it("renders correctly when unchecked", () => {
    const { asFragment } = render(
      <Checkbox
        id="test-checkbox"
        label="Test Checkbox"
        checked={false}
        onChange={mockOnChange}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders correctly when checked", () => {
    const { asFragment } = render(
      <Checkbox
        id="test-checkbox"
        label="Test Checkbox"
        checked={true}
        onChange={mockOnChange}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders correctly when disabled and unchecked", () => {
    const { asFragment } = render(
      <Checkbox
        id="test-checkbox"
        label="Test Checkbox"
        checked={false}
        onChange={mockOnChange}
        disabled
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders correctly when disabled and checked", () => {
    const { asFragment } = render(
      <Checkbox
        id="test-checkbox"
        label="Test Checkbox"
        checked={true}
        onChange={mockOnChange}
        disabled
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders with a description", () => {
    const { asFragment } = render(
      <Checkbox
        id="test-checkbox"
        label="Test Checkbox"
        checked={false}
        onChange={mockOnChange}
        description="This is a test description."
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("calls onChange handler when clicked", () => {
    render(
      <Checkbox
        id="test-checkbox"
        label="Test Checkbox"
        checked={false}
        onChange={mockOnChange}
      />,
    );
    fireEvent.click(screen.getByLabelText("Test Checkbox"));
    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledWith(true);
  });

  it("calls onChange handler with correct value when already checked", () => {
    render(
      <Checkbox
        id="test-checkbox"
        label="Test Checkbox"
        checked={true}
        onChange={mockOnChange}
      />,
    );
    fireEvent.click(screen.getByLabelText("Test Checkbox"));
    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledWith(false);
  });

  it("does not call onChange handler when disabled", () => {
    render(
      <Checkbox
        id="test-checkbox"
        label="Test Checkbox"
        checked={false}
        onChange={mockOnChange}
        disabled
      />,
    );
    fireEvent.click(screen.getByLabelText("Test Checkbox"));
    expect(mockOnChange).not.toHaveBeenCalled();
  });
});
