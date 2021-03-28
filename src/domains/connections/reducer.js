import { formatAllConnections } from 'formatters/connections';
import PageActionTypes from 'sagas/actionTypes/confirmConnection';
import { OAUTH_ACCESS_STATUS } from 'constants/connections';
import ActionTypes from './actionTypes';

const initialState = {
  data: [],
  integrationStatus: '',
};

export default function(state = initialState, { type, payload }) {
  switch (type) {
    case ActionTypes.GET_ALL_CONNECTIONS_SUCCESS: {
      return {
        ...state,
        data: formatAllConnections(payload),
      };
    }
    case PageActionTypes.CONNECTION_SETUP_SUCCESS: {
      return {
        ...state,
        integrationStatus: OAUTH_ACCESS_STATUS.SUCCESS,
      };
    }
    case PageActionTypes.CONNECTION_SETUP_FAILURE: {
      return {
        ...state,
        integrationStatus: OAUTH_ACCESS_STATUS.ERROR,
      };
    }
    default: {
      return state;
    }
  }
}
