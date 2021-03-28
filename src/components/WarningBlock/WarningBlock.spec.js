import React from 'react';
import { render } from '@testing-library/react';
import WarningBlock from './WarningBlock';

describe('WarningBlock tests', () => {
  it('Check snapshots of WarningBlock are equal.', () => {
    const { asFragment } = render(<WarningBlock text="" buttonText="" route="" textBeforeButton="" />);
    expect(asFragment()).toMatchSnapshot();
  });
});
