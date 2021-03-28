import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getConfirmRegistrationStatus } from 'domains/auth/selectors';
import ConfirmRegistration from './ConfirmRegistration';

const selectors = createStructuredSelector({
  registrationStatus: getConfirmRegistrationStatus,
});

export default connect(selectors, null)(ConfirmRegistration);
