import React from 'react';
import { render } from '@testing-library/react';
import ConfirmEmailChange from './ConfirmEmailChange';

describe('ConfirmEmailChange tests', () => {
  it('Check snapshots of ConfirmEmailChange are equal.', () => {
    const { asFragment } = render(<ConfirmEmailChange />);
    expect(asFragment()).toMatchSnapshot();
  });
});
