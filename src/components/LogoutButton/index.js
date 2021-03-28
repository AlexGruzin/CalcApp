import { connect } from 'react-redux';
import { userLogout } from 'domains/auth/actions';

import LogoutButton from './LogoutButton';

const mapDispatchToProps = { userLogout };

export default connect(null, mapDispatchToProps)(LogoutButton);
