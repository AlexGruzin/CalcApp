import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactDatePicker from 'react-datepicker';
import classNames from 'classnames';
import CustomHeader from '../CustomHeader';

import 'react-datepicker/dist/react-datepicker.css';
import './DatePicker.styles.less';

const getDateFormat = ({ timeSelect, timeSelectOnly, customDateFormat }) => {
  if (customDateFormat) return customDateFormat;
  if (timeSelectOnly) return 'H:mm';
  if (timeSelect) return 'dd/MM/yyyy HH:mm';

  return 'dd/MM/yyyy';
};

const DatePicker = ({
  timeSelect,
  timeSelectOnly,
  customDateFormat,
  handleDateChange,
  start,
  placeholder,
  error,
  label,
  name,
  open,
  ...props
}) => {
  const [startDate, setStartDate] = useState(start);
  const dateFormat = useMemo(() => getDateFormat({ timeSelect, timeSelectOnly, customDateFormat }), [
    customDateFormat,
    timeSelect,
    timeSelectOnly,
  ]);

  const onStartDateChange = date => {
    handleDateChange({ start: date });
    setStartDate(date);
  };

  useEffect(() => {
    handleDateChange({ start });
    setStartDate(start);
  }, [start]);

  return (
    <div className="date-picker__wrapper">
      {label && <label htmlFor={name}>{label}</label>}
      <ReactDatePicker
        calendarClassName={classNames('custom-date-picker', { isOpen: open })}
        className={classNames('custom-date-picker__input', { isOpen: open })}
        open={open}
        name={name}
        selected={startDate}
        onChange={onStartDateChange}
        showTimeSelect={timeSelect}
        showTimeSelectOnly={timeSelectOnly}
        dateFormat={dateFormat}
        timeIntervals={15}
        timeFormat="p"
        popperPlacement="bottom-end"
        placeholderText={placeholder}
        // timeCaption={t('app:datePicker.timeCaption')}
        popperModifiers={{
          offset: {
            enabled: true,
            offset: '0px, -1px',
          },
          flip: {
            enabled: false,
          },
        }}
        renderCustomHeader={headerProps => <CustomHeader {...headerProps} />}
        {...props}
      />
    </div>
  );
};

DatePicker.propTypes = {
  customCss: PropTypes.func,
  customDateFormat: PropTypes.string,
  timeSelect: PropTypes.bool,
  timeSelectOnly: PropTypes.bool,
  handleDateChange: PropTypes.func,
  start: PropTypes.instanceOf(Date),
  placeholder: PropTypes.string,
  error: PropTypes.object,
  label: PropTypes.string,
  name: PropTypes.string,
  open: PropTypes.bool,
};

DatePicker.defaultProps = {
  customCss: null,
  customDateFormat: '',
  timeSelect: false,
  timeSelectOnly: false,
  handleDateChange: () => undefined,
  start: new Date(),
  placeholder: '',
  error: null,
  label: '',
  name: '',
  open: false,
};

export default DatePicker;
