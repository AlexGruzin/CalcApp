import { connect } from 'react-redux';

import { initConfirmPassword } from 'sagas/actions/confirmResetPassword';
import ConfirmResetPassword from './ConfirmResetPassword';

export default connect(null, { confirmPassword: initConfirmPassword })(ConfirmResetPassword);
