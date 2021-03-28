import { connect } from 'react-redux';
import { storeSessionToken } from 'domains/auth/actions';

import ShopifySignup from './ShopifySignup';

export default connect(null, { storeSessionToken })(ShopifySignup);
