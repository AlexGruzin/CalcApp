import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './ErrorMessage.styles.less';

const ErrorMessage = ({ className, children }) => (
  <div className={classNames(className, 'error-wrp')}>
    <img src="/svg/angle-left.svg" className="error-wrp__icon" alt="error icon" />
    <div className="error-wrp__content">{children}</div>
  </div>
);

ErrorMessage.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.array, PropTypes.string]),
};

ErrorMessage.defaultProps = {
  className: '',
  children: null,
};

export default ErrorMessage;
