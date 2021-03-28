import { createStructuredSelector } from 'reselect';
import { shopifySignUpStatusSelector } from 'domains/auth/selectors';

export default createStructuredSelector({
  shopifySignUpStatus: shopifySignUpStatusSelector,
});
