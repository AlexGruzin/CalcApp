import React from 'react';
import { render } from '@testing-library/react';
import ConfirmConnection from './ConfirmConnection';

describe('ConfirmConnection tests', () => {
  it('Check snapshots of ConfirmConnection are equal.', () => {
    const { asFragment } = render(<ConfirmConnection />);
    expect(asFragment()).toMatchSnapshot();
  });
});
