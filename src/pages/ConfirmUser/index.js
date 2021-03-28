import { connect } from 'react-redux';

import { initConfirmUser } from 'sagas/actions/confirmUser';
import ConfirmUser from './ConfirmUser';

export default connect(null, { confirmUser: initConfirmUser })(ConfirmUser);
