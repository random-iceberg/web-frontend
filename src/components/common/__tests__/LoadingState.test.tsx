import React from "react";
import { render } from "@testing-library/react";
import LoadingState from "../LoadingState";

describe("LoadingState Component", () => {
  it("renders correctly with a message", () => {
    const { asFragment } = render(<LoadingState message="Loading data..." />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders correctly with a different message", () => {
    const { asFragment } = render(<LoadingState message="Fetching results..." />);
    expect(asFragment()).toMatchSnapshot();
  });
});
