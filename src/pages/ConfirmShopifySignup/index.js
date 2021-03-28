import { connect } from 'react-redux';
import ConfirmConnection from './ConfirmShopifySignup';
import selector from './selectors';

export default connect(selector, null)(ConfirmConnection);
