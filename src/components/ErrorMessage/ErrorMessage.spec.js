import React from 'react';
import { render } from '@testing-library/react';

import ErrorMessage from './ErrorMessage';

describe('ErrorMessage tests', () => {
  it('Check snapshots of ErrorMessage are equal.', () => {
    const { asFragment } = render(<ErrorMessage className="custom-error">{'Custom error'}</ErrorMessage>);
    expect(asFragment()).toMatchSnapshot();
  });
});
