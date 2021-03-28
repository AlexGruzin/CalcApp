import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import classNames from 'classnames';
import CreatableSelect from 'react-select/creatable';
import noop from 'lodash/noop';

import './CustomSelect.styles.less';

const customStyles = {
  // TODO Update with classNamePrefix from react-select
  indicatorSeparator: () => ({
    display: 'none',
  }),
  dropdownIndicator: provided => ({
    ...provided,
    color: '#c823b0',
  }),
};

const formatCreateLabel = value => value;

const CustomSelect = props => {
  const { innerRef, options, placeholder, name, className, label, creatable, value, defaultValue, ...rest } = props;

  const translatedOptions = useMemo(
    () =>
      options.map(option => ({
        ...option,
        label: option.label,
      })),
    [options]
  );

  const translatedDefault = defaultValue
    ? {
        value: defaultValue.value,
        label: defaultValue.label,
      }
    : { value: '', label: '' }; // TODO test placeholder

  return (
    <div className={classNames('custom-select', className, { withLabel: label })}>
      {label && <label htmlFor={name}>{label}</label>}
      {creatable ? (
        <CreatableSelect
          classNamePrefix="custom-select"
          styles={customStyles}
          defaultValue={translatedDefault}
          placeholder={placeholder}
          name={name}
          id={name}
          value={value}
          formatCreateLabel={formatCreateLabel}
          options={translatedOptions}
          ref={innerRef}
          {...rest}
        />
      ) : (
        <Select
          classNamePrefix="custom-select"
          styles={customStyles}
          defaultValue={translatedDefault}
          placeholder={placeholder}
          name={name}
          id={name}
          value={value}
          options={translatedOptions}
          ref={innerRef}
          {...rest}
        />
      )}
    </div>
  );
};

CustomSelect.propTypes = {
  className: PropTypes.string,
  customSelectStyles: PropTypes.func,
  innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({ current: PropTypes.instanceOf(Element) })]),
  placeholder: PropTypes.string,
  name: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object),
  label: PropTypes.string,
  error: PropTypes.object,
  value: PropTypes.object,
  creatable: PropTypes.bool,
  defaultValue: PropTypes.object,
};

CustomSelect.defaultProps = {
  placeholder: '',
  name: '',
  label: '',
  options: [],
  className: '',
  innerRef: noop,
  error: null,
  creatable: false,
  customSelectStyles: noop,
  defaultValue: null,
  value: null,
};

export default CustomSelect;
