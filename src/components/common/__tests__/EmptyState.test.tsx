import React from "react";
import { render } from "@testing-library/react";
import EmptyState from "../EmptyState";

describe("EmptyState Component", () => {
  it("renders correctly with a message", () => {
    const { asFragment } = render(<EmptyState message="No data available" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders correctly with a different message", () => {
    const { asFragment } = render(
      <EmptyState message="Search results not found" />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
