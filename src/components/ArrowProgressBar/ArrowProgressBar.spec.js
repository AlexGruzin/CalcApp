import React from 'react';
import { render } from '@testing-library/react';

import ArrowProgressBar from './ArrowProgressBar';

describe('ArrowProgressBar tests', () => {
  it('Check snapshots of ArrowProgressBar are equal.', () => {
    const { asFragment } = render(<ArrowProgressBar items={[]} active={0} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
