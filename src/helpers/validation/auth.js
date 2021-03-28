import { CODES } from 'constants/request';

const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const emailValidation = () => ({
  pattern: {
    value: EMAIL_REGEX,
    message: 'The email you entered is invalid.',
  },
  required: {
    value: true,
    message: 'Email is required.', // now this one is overridden with native html behaviour
  },
});

export const passwordValidation = () => ({
  required: true,
  minLength: {
    value: 8,
    message: 'Password is too short.',
  },
});

export const getErrorMsgByResponse = data => {
  switch (data.status) {
    case CODES.INTERNAL_SERVER_ERROR: {
      return 'Internal server error.';
    }
    default: {
      return data?.response?.message || 'app:error.unknown';
    }
  }
};
