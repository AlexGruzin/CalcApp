import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Slider.styles.less';

const Slider = ({ className, indicator, onChange, defaultValue }) => {
  const [currentValue, setCurrentValue] = useState(defaultValue);

  const handleOnChange = e => {
    onChange(e);
    setCurrentValue(e.target.value);
  };

  const percentHeight = 280 / 100; // TODO 280 - rect overall height get from dom api

  const normalizedPercent = 100 - currentValue;

  return (
    <div className={classNames(className, 'range-slider')}>
      <div className="range-slider__rotator">
        <input
          className="range-slider__range"
          onChange={handleOnChange}
          value={currentValue}
          type="range"
          min="0"
          max="100"
          step="1"
        />
        <span className="slider-bar">
          <span
            className="slider-bar__styled"
            style={{ width: `${percentHeight * normalizedPercent - (16 * normalizedPercent) / 100}px` }}
          />
        </span>
        {indicator && <span className="range-slider__indicator">100</span>}
      </div>
    </div>
  );
};

Slider.propTypes = {
  className: PropTypes.string,
  indicator: PropTypes.string,
  onChange: PropTypes.func,
  defaultValue: PropTypes.number,
};

Slider.defaultProps = {
  className: '',
  defaultValue: 50,
  indicator: false,
  onChange: () => undefined,
};

export default Slider;
