import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { CircleSpinner } from 'react-spinners-kit';

import './Spinner.styles.less';

const Spinner = ({ className, type, ...innerProps }) => (
  <div className={classnames('spinner', className, { [`spinner__${type}`]: type })}>
    <CircleSpinner loading {...innerProps} />
  </div>
);

Spinner.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
  frontColor: PropTypes.string,
  backColor: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.string,
};

Spinner.defaultProps = {
  size: 24,
  color: '#fff',
  frontColor: 'transparent',
  backColor: 'transparent',
  className: null,
  type: '',
};

export default Spinner;
