import { createAction as createAPIAction } from 'redux-api-middleware';
import ActionTypes from './actionTypes';
import { API_DOMAIN, API_PATH } from '../../constants/envConstants';
import { makeRequest } from '../../sagas/actions/callApi';

export const getAllCampaigns = () =>
  // TODO use callApi
  createAPIAction({
    endpoint: 'https://jsonplaceholder.typicode.com/comments?_limit=5',
    // endpoint: `${API_DOMAIN}${API_PATH}/campaigns`,
    method: 'GET',
    types: [
      ActionTypes.GET_ALL_CAMPAIGNS,
      ActionTypes.GET_ALL_CAMPAIGNS_SUCCESS,
      ActionTypes.GET_ALL_CAMPAIGNS_FAILURE,
    ],
  });

const forecastPredictionRequest = payload =>
  createAPIAction({
    endpoint: `${API_DOMAIN}${API_PATH}/forecasts/process`,
    method: 'POST',
    body: { ...payload },
    types: [
      ActionTypes.FORECAST_PREDICTION_REQUEST,
      ActionTypes.FORECAST_PREDICTION_SUCCESS,
      ActionTypes.FORECAST_PREDICTION_FAILURE,
    ],
  });
export const forecastPrediction = props => makeRequest(forecastPredictionRequest(props));
