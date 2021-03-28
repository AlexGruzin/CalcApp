import { connect } from 'react-redux';
import { postLogIn } from 'sagas/actions/logIn';

import { withTranslation } from 'react-i18next';

import LogIn from './LogIn';
import selector from './selectors';

const mapDispatchToProps = {
  postLogIn,
};

export default connect(selector, mapDispatchToProps)(withTranslation()(LogIn));
