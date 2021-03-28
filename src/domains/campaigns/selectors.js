import { createSelector } from 'reselect';

export const getCampaigns = state => state.campaigns || {};

export const getCampaignsData = createSelector(getCampaigns, campaigns => campaigns.allCampaigns || []);
export const getCampaignsFail = createSelector(getCampaigns, campaigns => campaigns.failRequest);
export const isLoading = createSelector(getCampaigns, campaigns => campaigns.isLoading);
