import React from 'react';
import { render } from '@testing-library/react';
import { renderWithi18next } from 'config/tests';

import ProgressBar from './ProgressBar';

describe('CampaignsTable tests', () => {
  it('Check snapshots of CampaignsTable are equal.', () => {
    const { asFragment } = renderWithi18next(<ProgressBar />);
    expect(asFragment()).toMatchSnapshot();
  });
});
