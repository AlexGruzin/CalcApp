import React from 'react';
import PropTypes from 'prop-types';

import './Checkbox.styles.less';

const Checkbox = props => {
  const { label, subLabel, name, ...rest } = props;

  return (
    <label htmlFor={name} className="custom-checkbox">
      <input id={name} name={name} type="checkbox" {...rest} />
      <span className="Checkbox-label">
        {label && <span className="custom-checkbox__label-text">{label}</span>}
        {subLabel && <span className="custom-checkbox__sublabel-text">{subLabel}</span>}
      </span>
    </label>
  );
};

Checkbox.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  subLabel: PropTypes.string,
};

Checkbox.defaultProps = {
  label: '',
  subLabel: '',
  name: '',
};

export default Checkbox;
