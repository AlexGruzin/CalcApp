import React from 'react';
import { waitFor, render } from '@testing-library/react';

import Slide from './Slide';

describe('Slide tests', () => {
  it('Check snapshots of Slide are equal.', () => {
    const { asFragment } = render(
      <Slide key="key" index={1} link="/link" image="/image" title="title" description="description" />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
