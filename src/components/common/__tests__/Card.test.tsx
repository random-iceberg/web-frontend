import React from 'react';
import { render } from '@testing-library/react';
import Card from '../Card';

describe('Card Component', () => {
  it('renders correctly with children', () => {
    const { asFragment } = render(
      <Card>
        <p>This is card content.</p>
      </Card>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders correctly with children and className', () => {
    const { asFragment } = render(
      <Card className="my-custom-card extra-padding">
        <h2>Card Title</h2>
        <p>More card content.</p>
      </Card>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders correctly with no children', () => {
    const { asFragment } = render(<Card />);
    expect(asFragment()).toMatchSnapshot();
  });
});
