import { connect } from 'react-redux';
import { postSignUp } from 'sagas/actions/signUp';

import SignUp from './SignUp';
import selector from './selectors';

export default connect(selector, { postSignUp })(SignUp);
