import React from "react";
import { render } from "@testing-library/react";
import PageHeader from "../PageHeader";

describe("PageHeader Component", () => {
  it("renders correctly with title and description", () => {
    const { asFragment } = render(
      <PageHeader
        title="Page Title"
        description="This is a description of the page."
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders correctly with different title and description", () => {
    const { asFragment } = render(
      <PageHeader
        title="Another Page"
        description="Another description here."
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
