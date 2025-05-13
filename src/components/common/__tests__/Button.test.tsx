import React from "react";
import { render } from "@testing-library/react";
import Button from "../Button";

describe("Button Component", () => {
  it("renders primary button correctly", () => {
    const { asFragment } = render(<Button>Primary</Button>);
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders secondary button correctly", () => {
    const { asFragment } = render(
      <Button variant="secondary">Secondary</Button>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders danger button correctly", () => {
    const { asFragment } = render(<Button variant="danger">Danger</Button>);
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders link button correctly", () => {
    const { asFragment } = render(<Button variant="link">Link</Button>);
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders small button correctly", () => {
    const { asFragment } = render(<Button size="sm">Small</Button>);
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders large button correctly", () => {
    const { asFragment } = render(<Button size="lg">Large</Button>);
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders fullWidth button correctly", () => {
    const { asFragment } = render(<Button fullWidth>Full Width</Button>);
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders disabled button correctly", () => {
    const { asFragment } = render(<Button disabled>Disabled</Button>);
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders with additional className", () => {
    const { asFragment } = render(
      <Button className="my-custom-class">Custom Class</Button>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders with onClick handler (structure check)", () => {
    const mockOnClick = jest.fn();
    const { asFragment } = render(
      <Button onClick={mockOnClick}>Click Me</Button>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
