import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import DropDown from "../DropDown";

describe("DropDown Component", () => {
  const mockOnSelect = jest.fn();
  const options = ["Option 1", "Option 2", "Option 3"];

  beforeEach(() => {
    mockOnSelect.mockClear();
  });

  it("renders correctly with a label and placeholder value", () => {
    const { asFragment } = render(
      <DropDown
        id="test-dropdown"
        label="Select an Option"
        value=""
        onSelect={mockOnSelect}
      >
        {options.map((opt) => (
          <button type="button" key={opt}>
            {opt}
          </button>
        ))}
      </DropDown>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders correctly with a selected value", () => {
    const { asFragment } = render(
      <DropDown
        id="test-dropdown"
        label="Select an Option"
        value="Option 2"
        onSelect={mockOnSelect}
      >
        {options.map((opt) => (
          <button type="button" key={opt}>
            {opt}
          </button>
        ))}
      </DropDown>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders correctly when disabled", () => {
    const { asFragment } = render(
      <DropDown
        id="test-dropdown"
        label="Select an Option"
        value=""
        onSelect={mockOnSelect}
        disabled
      >
        {options.map((opt) => (
          <button type="button" key={opt}>
            {opt}
          </button>
        ))}
      </DropDown>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders with a description", () => {
    const { asFragment } = render(
      <DropDown
        id="test-dropdown"
        label="Select an Option"
        value=""
        onSelect={mockOnSelect}
        description="This is a helpful description."
      >
        {options.map((opt) => (
          <button type="button" key={opt}>
            {opt}
          </button>
        ))}
      </DropDown>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("opens dropdown on click and shows options", () => {
    render(
      <DropDown
        id="test-dropdown"
        label="Select an Option"
        value=""
        onSelect={mockOnSelect}
      >
        {options.map((opt) => (
          <button type="button" key={opt}>
            {opt}
          </button>
        ))}
      </DropDown>,
    );
    // Initially, options are not visible
    expect(screen.queryByText("Option 1")).not.toBeInTheDocument();

    // Click the dropdown trigger (button with label text)
    fireEvent.click(screen.getByText("Select an Option"));

    // Now options should be visible
    expect(screen.getByText("Option 1")).toBeInTheDocument();
    expect(screen.getByText("Option 2")).toBeInTheDocument();
    expect(screen.getByText("Option 3")).toBeInTheDocument();
  });

  it("selects an option and calls onSelect when an option is clicked", () => {
    render(
      <DropDown
        id="test-dropdown"
        label="Select an Option"
        value=""
        onSelect={mockOnSelect}
      >
        {options.map((opt) => (
          <button type="button" key={opt}>
            {opt}
          </button>
        ))}
      </DropDown>,
    );

    // Open dropdown
    fireEvent.click(screen.getByText("Select an Option"));

    // Click on "Option 2"
    fireEvent.click(screen.getByText("Option 2"));

    expect(mockOnSelect).toHaveBeenCalledTimes(1);
    expect(mockOnSelect).toHaveBeenCalledWith("Option 2");
  });

  it("closes dropdown when an option is selected", () => {
    render(
      <DropDown
        id="test-dropdown"
        label="Select an Option"
        value=""
        onSelect={mockOnSelect}
      >
        {options.map((opt) => (
          <button type="button" key={opt}>
            {opt}
          </button>
        ))}
      </DropDown>,
    );
    fireEvent.click(screen.getByText("Select an Option")); // Open
    expect(screen.getByText("Option 1")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Option 1")); // Select and close
    expect(screen.queryByText("Option 1")).not.toBeInTheDocument(); // Should be closed
  });

  it("closes dropdown when clicking outside", () => {
    render(
      <div>
        <DropDown
          id="test-dropdown"
          label="Select an Option"
          value=""
          onSelect={mockOnSelect}
        >
          {options.map((opt) => (
            <button type="button" key={opt}>
              {opt}
            </button>
          ))}
        </DropDown>
        <button type="button">Outside Button</button>
      </div>,
    );
    fireEvent.click(screen.getByText("Select an Option")); // Open
    expect(screen.getByText("Option 1")).toBeInTheDocument();

    // Click outside (on the body or another element)
    fireEvent.mouseDown(document.body); // Simulate mousedown on body

    expect(screen.queryByText("Option 1")).not.toBeInTheDocument(); // Should be closed
  });
});
