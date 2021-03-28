import ActionTypes from 'sagas/actionTypes/survey';
import { createAction as createAPIAction } from 'redux-api-middleware';
import { API_PATH, API_DOMAIN } from 'constants/envConstants';
import { makeRequest } from './callApi';

export const postSurveyDataRequest = payload =>
  createAPIAction({
    endpoint: `${API_DOMAIN}${API_PATH}/user/survey`,
    method: 'POST',
    body: payload,
    types: [ActionTypes.SUBMIT_SURVEY_REQUEST, ActionTypes.SUBMIT_SURVEY_SUCCESS, ActionTypes.SUBMIT_SURVEY_FAILURE],
  });
export const postSurveyData = props => makeRequest(postSurveyDataRequest(props));

export const getSurveyDataRequest = () =>
  createAPIAction({
    endpoint: `${API_DOMAIN}${API_PATH}/user/survey`,
    method: 'GET',
    types: [
      ActionTypes.GET_SURVEY_DATA_REQUEST,
      ActionTypes.GET_SURVEY_DATA_SUCCESS,
      ActionTypes.GET_SURVEY_DATA_FAILURE,
    ],
  });
export const getSurveyData = () => makeRequest(getSurveyDataRequest());
