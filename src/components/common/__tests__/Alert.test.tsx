import React from "react";
import { render } from "@testing-library/react";
import Alert from "../Alert";

describe("Alert Component", () => {
  it("renders info alert correctly", () => {
    const { asFragment } = render(
      <Alert variant="info" title="Information">
        This is an info alert.
      </Alert>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders success alert correctly", () => {
    const { asFragment } = render(
      <Alert variant="success" title="Success!">
        Operation successful.
      </Alert>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders error alert correctly", () => {
    const { asFragment } = render(
      <Alert variant="error" title="Error Occurred">
        Something went wrong.
      </Alert>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders warning alert correctly", () => {
    const { asFragment } = render(
      <Alert variant="warning" title="Warning">
        Please be careful.
      </Alert>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders alert without title correctly", () => {
    const { asFragment } = render(
      <Alert variant="info">This is an info alert without a title.</Alert>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders with additional className", () => {
    const { asFragment } = render(
      <Alert variant="success" className="my-custom-class">
        Custom class test.
      </Alert>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
