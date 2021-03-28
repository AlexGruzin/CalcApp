import React from 'react';
import { waitFor, render } from '@testing-library/react';

import Spinner from './Spinner';

describe('Spinner tests', () => {
  it('Check snapshots of Spinner are equal.', () => {
    const { asFragment } = render(<Spinner className="my-spinner" type="circle" />);
    expect(asFragment()).toMatchSnapshot();
  });
});
