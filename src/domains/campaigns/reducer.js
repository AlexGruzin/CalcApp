import ActionTypes from './actionTypes';

const initialState = {
  allCampaigns: [],
  failRequest: false,
  isLoading: false,
};

export default function(state = initialState, { type, payload }) {
  switch (type) {
    case ActionTypes.GET_ALL_CAMPAIGNS: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case ActionTypes.GET_ALL_CAMPAIGNS_SUCCESS: {
      return {
        ...state,
        allCampaigns: [...payload],
        failRequest: false,
        isLoading: false,
      };
    }
    case ActionTypes.GET_ALL_CAMPAIGNS_FAILURE: {
      return {
        ...state,
        failRequest: true,
        isLoading: false,
      };
    }
    default: {
      return state;
    }
  }
}
