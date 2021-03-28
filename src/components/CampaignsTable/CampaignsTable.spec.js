import React from 'react';
import { render } from '@testing-library/react';
import { campaignsList } from 'constants/campaigns';

import { renderWithi18next } from 'config/tests';

import CampaignsTable from './CampaignsTable';

describe('CampaignsTable tests', () => {
  it('Check snapshots of CampaignsTable are equal.', () => {
    const { asFragment } = renderWithi18next(<CampaignsTable items={campaignsList} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
