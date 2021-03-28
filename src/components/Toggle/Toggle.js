import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Toggle.styles.less';

const Toggle = ({ className, label, name, value, checked, ...innerProps }) => (
  <div className="custom-toggle-wrapper">
    {label && (
      <label className="custom-toggle-label" htmlFor={name}>
        {label}
      </label>
    )}
    <input
      className={classNames('custom-toggle', className)}
      type="checkbox"
      checked={!!(checked || value)}
      name={name}
      id={name}
      {...innerProps}
    />
  </div>
);

Toggle.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.bool,
  checked: PropTypes.bool,
};

Toggle.defaultProps = {
  className: '',
  label: '',
  name: '',
  value: false,
  checked: false,
};

export default Toggle;
