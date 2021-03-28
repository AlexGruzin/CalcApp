import React from 'react';

import { renderWithi18next } from 'config/tests';

import GreetingModal from './GreetingModal';

describe('GreetingModal tests', () => {
  it('Check snapshots of GreetingModal are equal.', () => {
    const { asFragment } = renderWithi18next(<GreetingModal />);
    expect(asFragment()).toMatchSnapshot();
  });
});
