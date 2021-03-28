import { connect } from 'react-redux';
import ConfirmConnection from './ConfirmConnection';
import selector from './selectors';

export default connect(selector, null)(ConfirmConnection);
