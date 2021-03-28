import React from 'react';
import PropTypes from 'prop-types';
import getMonth from 'date-fns/getMonth';
import Button from 'components/Button';

import './CustomHeader.styles.less';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const CustomHeader = ({ date, decreaseMonth, increaseMonth, prevMonthButtonDisabled, nextMonthButtonDisabled }) => (
  <div className="custom-date-picker-header">
    <Button className="custom-date-picker-header__left" onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
      <img src="/svg/angle-right-black.svg" alt="previous icon" />
    </Button>

    <h4>{months[getMonth(date)]}</h4>
    <Button className="custom-date-picker-header__right" onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
      <img src="/svg/angle-right-black.svg" alt="next icon" />
    </Button>
  </div>
);

CustomHeader.propTypes = {
  date: PropTypes.object.isRequired,
  decreaseMonth: PropTypes.func.isRequired,
  increaseMonth: PropTypes.func.isRequired,
  prevMonthButtonDisabled: PropTypes.bool.isRequired,
  nextMonthButtonDisabled: PropTypes.bool.isRequired,
};

CustomHeader.defaultProps = {};

export default CustomHeader;
