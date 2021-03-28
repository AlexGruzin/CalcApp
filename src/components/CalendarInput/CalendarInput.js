import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import DatePicker from './DatePicker';

import './CalendarInput.styles.less';

const CalendarInput = ({ label, name, isOpen: isOpenDefault, onChange, start }) => {
  const [isOpen, setIsOpen] = useState(isOpenDefault);

  const handleOnChange = data => {
    onChange(data);
  };

  const toggleOpen = () => {
    // event.stopPropagation();
    // event.preventDefault(); // TODO check node to close via icon
    setIsOpen(!isOpen);
  };

  return (
    <div className="calendar-input">
      {label && (
        <label className="calendar-input__label" htmlFor={name}>
          {label}
        </label>
      )}
      <div className={classNames('calendar-input__inner', isOpen, { withLabel: label })}>
        {/* // TODO wrap with button */}
        {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role */}
        <img src="/svg/calendar.svg" alt="calendar-svg" role="button" onClick={toggleOpen} />
        <DatePicker
          handleDateChange={handleOnChange}
          withCalendarIcon={false}
          onSelect={toggleOpen}
          open={isOpen}
          onClickOutside={toggleOpen}
          start={start}
        />
      </div>
    </div>
  );
};

CalendarInput.propTypes = {
  name: PropTypes.string,
  start: PropTypes.instanceOf(Date),
  label: PropTypes.string,
  isOpen: PropTypes.bool,
  onChange: PropTypes.func,
};

CalendarInput.defaultProps = {
  label: '',
  name: '',
  isOpen: false,
  onChange: () => undefined,
  start: new Date(),
};

export default CalendarInput;
