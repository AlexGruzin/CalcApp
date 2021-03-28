import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getEmailChangeStatus } from 'domains/auth/selectors';
import ConfirmEmailChange from './ConfirmEmailChange';

const selectors = createStructuredSelector({
  emailChangeStatus: getEmailChangeStatus,
});

export default connect(selectors, null)(ConfirmEmailChange);
