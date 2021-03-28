import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import ProgressBar from 'components/ProgressBar';

import './ProgressBar.styles.less';

const PerformanceCard = ({ className }) => (
  <div className={classNames('performance', className)}>
    <ProgressBar percent={50} label={''} />
    <ProgressBar percent={90} label={''} />
  </div>
);

PerformanceCard.propTypes = {
  className: PropTypes.string,
};

PerformanceCard.defaultProps = {
  className: '',
};

export default PerformanceCard;
