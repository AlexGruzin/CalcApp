import { connect } from 'react-redux';
import { ActionsCreators as ConnectActions } from 'domains/connections';
import {
  initUpdateGeneralDetails,
  initUpdateEmailOnly,
  initUpdateConnection,
  updateTeam,
  updateNotifications,
  updateStoreDetails,
} from 'sagas/actions/settings';
import Settings from './Settings';
import selector from './selectors';

const mapDispatchToProps = {
  updateGeneralDetails: initUpdateGeneralDetails,
  updateEmailOnly: initUpdateEmailOnly,
  updateConnection: initUpdateConnection,
  getConnections: ConnectActions.getAllConnections,
  deleteConnection: () => undefined,
  updateTeam,
  updateNotifications,
  updateStoreDetails,
};

export default connect(selector, mapDispatchToProps)(Settings);
