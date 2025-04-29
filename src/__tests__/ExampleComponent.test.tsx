/**
 * Unit test for the ExampleComponent using React Testing Library.
 *
 * TODO:
 *   - Expand tests as you add more functionality.
 */
import React from "react";
import { render, screen } from "@testing-library/react";
import ExampleComponent from "../components/ExampleComponent";

describe("ExampleComponent", () => {
  it("renders the welcome message", () => {
    render(<ExampleComponent />);
    expect(screen.getByText(/Welcome to Titanic App!/i)).toBeInTheDocument();
  });
});
