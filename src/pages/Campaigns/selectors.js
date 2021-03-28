import { createStructuredSelector } from 'reselect';
import { getCampaignsData, getCampaignsFail, isLoading } from 'domains/campaigns/selectors';

export default createStructuredSelector({
  allCampaigns: getCampaignsData,
  isCampaignsFail: getCampaignsFail,
  isLoading,
});
