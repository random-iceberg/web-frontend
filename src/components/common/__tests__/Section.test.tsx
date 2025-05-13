import React from 'react';
import { render } from '@testing-library/react';
import Section from '../Section';

describe('Section Component', () => {
  it('renders correctly with children', () => {
    const { asFragment } = render(
      <Section>
        <h1>Section Title</h1>
        <p>This is section content.</p>
      </Section>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders correctly with children and className', () => {
    const { asFragment } = render(
      <Section className="my-custom-section bg-blue-100" id="test-section">
        <h2>Another Section</h2>
      </Section>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders correctly with no children', () => {
    // A section can technically be empty, though usually it will have content.
    const { asFragment } = render(<Section id="empty-section" />);
    expect(asFragment()).toMatchSnapshot();
  });
});
