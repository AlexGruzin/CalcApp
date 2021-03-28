import { formatUserInfo } from 'formatters/auth';
import { formatGetSurvey } from 'formatters/survey';
import SettingsActionTypes from 'sagas/actionTypes/settings';
import { formatStoreDetails, formatGeneralDetails, formatTeamMembers, formatNotifications } from 'formatters/settings';
import PasswordActionTypes from 'sagas/actionTypes/confirmResetPassword';
import RegistrationActionTypes from 'sagas/actionTypes/confirmRegistration';
import EmailChangeTypes from 'sagas/actionTypes/confirmEmailChange';
import NewMemberTypes from 'sagas/actionTypes/confirmUser';
import ShopifySignUpTypes from 'sagas/actionTypes/confirmShopifySignup';
import SurveyActionTypes from 'sagas/actionTypes/survey';
import { CONFIRMATION_STATUS } from 'constants/auth';
import ActionTypes from './actionTypes';

const initialState = {
  data: {},
  settings: {},
  survey: {},
  sessionToken: '',
  registrationConfirmationStatus: '',
  passwordResetStatus: '',
  emailChangeStatus: '',
  memberConfirmationStatus: '',
  shopifySignUpStatus: '',
};

export default function(state = initialState, { type, payload }) {
  switch (type) {
    case ActionTypes.STORE_USER_DATA: {
      return {
        ...state,
        data: formatUserInfo(payload),
      };
    }
    case ActionTypes.STORE_SESSION_TOKEN: {
      return {
        ...state,
        sessionToken: payload,
      };
    }
    case SettingsActionTypes.GET_TEAM_SUCCESS: {
      return {
        ...state,
        settings: {
          ...state.settings,
          team: formatTeamMembers(payload),
        },
      };
    }
    case SettingsActionTypes.GET_STORE_DETAILS_SUCCESS: {
      return {
        ...state,
        settings: {
          ...state.settings,
          storeDetails: formatStoreDetails(payload),
        },
      };
    }
    case SettingsActionTypes.GET_GENERAL_DETAILS_SUCCESS: {
      return {
        ...state,
        settings: {
          ...state.settings,
          generalDetails: formatGeneralDetails(payload),
        },
      };
    }
    case SettingsActionTypes.GET_NOTIFICATIONS_SUCCESS: {
      return {
        ...state,
        settings: {
          ...state.settings,
          notifications: formatNotifications(payload),
        },
      };
    }
    case PasswordActionTypes.RESET_PASSWORD_FAILURE:
    case PasswordActionTypes.RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        passwordResetStatus:
          type === PasswordActionTypes.RESET_PASSWORD_SUCCESS ? CONFIRMATION_STATUS.SUCCESS : CONFIRMATION_STATUS.ERROR,
      };
    }
    case RegistrationActionTypes.CONFIRM_REGISTRATION_FAILURE:
    case RegistrationActionTypes.CONFIRM_REGISTRATION_SUCCESS: {
      return {
        ...state,
        registrationConfirmationStatus:
          type === RegistrationActionTypes.CONFIRM_REGISTRATION_SUCCESS
            ? CONFIRMATION_STATUS.SUCCESS
            : CONFIRMATION_STATUS.ERROR,
      };
    }
    case EmailChangeTypes.CONFIRM_EMAIL_CHANGE_SUCCESS:
    case EmailChangeTypes.CONFIRM_EMAIL_CHANGE_FAILURE: {
      return {
        ...state,
        emailChangeStatus:
          type === EmailChangeTypes.CONFIRM_EMAIL_CHANGE_SUCCESS
            ? CONFIRMATION_STATUS.SUCCESS
            : CONFIRMATION_STATUS.ERROR,
      };
    }
    case NewMemberTypes.CONFIRM_USER_SUCCESS:
    case NewMemberTypes.CONFIRM_USER_FAILURE: {
      return {
        ...state,
        memberConfirmationStatus:
          type === NewMemberTypes.CONFIRM_USER_SUCCESS ? CONFIRMATION_STATUS.SUCCESS : CONFIRMATION_STATUS.ERROR,
      };
    }
    case ShopifySignUpTypes.CONFIRM_SIGN_UP_SUCCESS:
    case ShopifySignUpTypes.SHOPIFY_SIGNUP_UNRESOLVED_FAILURE: {
      return {
        ...state,
        shopifySignUpStatus:
          type === ShopifySignUpTypes.CONFIRM_SIGN_UP_SUCCESS ? CONFIRMATION_STATUS.SUCCESS : CONFIRMATION_STATUS.ERROR,
      };
    }
    case SurveyActionTypes.GET_SURVEY_DATA_SUCCESS: {
      return {
        ...state,
        survey: formatGetSurvey(payload),
      };
    }
    case ActionTypes.LOG_OUT:
    case ActionTypes.LOG_OUT_FORCE: {
      return {};
    }
    default: {
      return state;
    }
  }
}
