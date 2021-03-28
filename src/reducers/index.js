import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import { reducer as user } from 'domains/auth';
import { reducer as connections } from 'domains/connections';
import { reducer as campaigns } from 'domains/campaigns';
import { reducer as audit } from 'domains/audit';

export default history =>
  combineReducers({
    router: connectRouter(history),
    user,
    connections,
    campaigns,
    audit,
  });
