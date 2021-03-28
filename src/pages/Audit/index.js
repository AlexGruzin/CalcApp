import { connect } from 'react-redux';
import {
  getAuditSteps,
  getAuditStatus,
  getAuditRun,
  getAccounts,
  getProperties,
  getViews,
  sendSelectedViewIdRequest,
} from 'domains/audit/actions';

import { ActionsCreators } from 'domains/connections';
import selector from './selectors';

import Audit from './Audit';

const mapDispatchToProps = {
  initShopifyIntegration: ActionsCreators.integrateShopify,
  initGAIntegration: ActionsCreators.integrateGoogleAnalytics,
  initGoogleAdsIntegration: ActionsCreators.integrateGoogleAds,
  initFacebookIntegration: ActionsCreators.initFacebookIntegration,
  initInstagramIntegration: ActionsCreators.initInstagramIntegration,
  getAuditSteps,
  getAuditRun,
  getAuditStatus,
  getAccounts,
  getProperties,
  getViews,
  sendSelectedViewId: sendSelectedViewIdRequest,
};

export default connect(selector, mapDispatchToProps)(Audit);
