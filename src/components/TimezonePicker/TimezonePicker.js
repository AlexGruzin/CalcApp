import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { defaultTimezoneOption } from 'constants/settings';

import ReactTimezoneSelect from 'react-timezone-select';

import './TimezonePicker.styles.less';

const TimezonePicker = ({ className, setSelectedTimezone, value, label, name, onBlur, ...rest }) => {
  const onChange = tz => {
    // format tz
    setSelectedTimezone(tz);
  };

  return (
    <div className={classNames('timezone-picker', className, { withLabel: label })}>
      {label && <label htmlFor={name}>{label}</label>}
      <ReactTimezoneSelect
        classNamePrefix="custom-timezone-picker"
        onBlur={onBlur}
        value={value}
        onChange={onChange}
        {...rest}
      />
    </div>
  );
};

TimezonePicker.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.object,
  className: PropTypes.string,
  setSelectedTimezone: PropTypes.func,
  onBlur: PropTypes.func,
};

TimezonePicker.defaultProps = {
  label: '',
  name: '',
  value: defaultTimezoneOption,
  className: '',
  setSelectedTimezone: () => undefined,
  onBlur: () => undefined,
};

export default TimezonePicker;
