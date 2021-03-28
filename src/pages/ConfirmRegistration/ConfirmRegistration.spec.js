import React from 'react';
import { render } from '@testing-library/react';
import ConfirmRegistration from './ConfirmRegistration';

describe('ConfirmRegistration tests', () => {
  it('Check snapshots of ConfirmRegistration are equal.', () => {
    const { asFragment } = render(<ConfirmRegistration />);
    expect(asFragment()).toMatchSnapshot();
  });
});
