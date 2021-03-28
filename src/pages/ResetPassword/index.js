import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';

import { sendEmailResetPassword } from 'sagas/actions/resetPassword';
import ResetPassword from './ResetPassword';

export default connect(null, { sendEmailResetPassword })(withTranslation()(ResetPassword));
