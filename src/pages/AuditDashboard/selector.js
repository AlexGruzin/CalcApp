import { createStructuredSelector } from 'reselect';
import { flow } from 'lodash';

import { getDashboardAudit } from 'domains/audit/selectors';

const reportData = flow([getDashboardAudit], audit => audit.reportData || {});

export default createStructuredSelector({
  reportData,
  // audit: getDashboardAudit,
});
