import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './ProgressBar.styles.less';

const ProgressBar = ({ className, percent, label }) => {
  const [controlledPercent, setControlledPercent] = useState(percent);

  useEffect(() => {
    setControlledPercent(percent);
  }, [percent]);

  return (
    <div className={classNames('progress-bar__border', className)}>
      <div className="progress-bar__wrapper" style={{ width: `${controlledPercent}%` }}>
        <h6 className="progress-bar__label">{label}</h6>
        <div className="progress-bar__bar" />
      </div>
    </div>
  );
};

ProgressBar.propTypes = {
  label: PropTypes.string,
  className: PropTypes.string,
  percent: PropTypes.number,
};

ProgressBar.defaultProps = {
  label: '',
  className: '',
  percent: 0,
};

export default ProgressBar;
