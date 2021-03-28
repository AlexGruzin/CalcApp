import { createStructuredSelector } from 'reselect';
import { getIntegrationStatus } from 'domains/connections/selectors';

export default createStructuredSelector({
  integrationStatus: getIntegrationStatus,
});
