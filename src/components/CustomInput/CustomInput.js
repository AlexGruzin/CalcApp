import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './CustomInput.styles.less';

const CustomInput = React.forwardRef((props, ref) => {
  const { type, name, className, label, isError, errMessage, beforeText, ...rest } = props;

  return (
    <div className={classNames(className, 'custom-input', { withLabel: label, isError })}>
      {label && <label htmlFor={name}>{label}</label>}
      {beforeText && <span className="custom-input__before">{beforeText}</span>}
      <input {...rest} aria-label={name} name={name} id={name} ref={ref} type={type} />
      {/* // TODO make error appear animation */}
      <div className="custom-input__error">{isError && errMessage ? errMessage : null}</div>
    </div>
  );
});

CustomInput.propTypes = {
  type: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.array, PropTypes.func]),
  label: PropTypes.string,
  name: PropTypes.string,
  className: PropTypes.string,
  isError: PropTypes.bool,
  beforeText: PropTypes.string,
  errMessage: PropTypes.string,
};

CustomInput.defaultProps = {
  isError: false,
  children: null,
  type: 'text',
  label: '',
  name: '',
  className: '',
  beforeText: '',
  errMessage: '',
};

export default CustomInput;
