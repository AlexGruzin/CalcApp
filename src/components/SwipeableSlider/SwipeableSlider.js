import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import SwipeableViews from 'react-swipeable-views';
import { autoPlay as autoPlayer, virtualize } from 'react-swipeable-views-utils';
import Slide from './Slide';

import './SwipeableSlider.styles.less';

const EnhancedSwipeableViews = autoPlayer(virtualize(SwipeableViews));

const mod = (index, overallAmount) => {
  const offset = index % overallAmount;
  return offset < 0 ? offset + overallAmount : offset;
};

const Slider = ({ className, slides, direction, autoPlay, onChange }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [infiniteIndex, setInfiniteIndex] = useState(0);
  const [isFocused, setIsFocused] = useState(true);

  const handleFocusChange = () => {
    setIsFocused(true);
  };

  const handleBlurChange = () => {
    setIsFocused(false);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('focus', handleFocusChange);
      window.addEventListener('blur', handleBlurChange);
    }

    return () => {
      window.removeEventListener('focus', handleFocusChange);
      window.removeEventListener('blur', handleBlurChange);
    };
  }, []);

  const handleChangeSelectedIndex = index => {
    setSelectedIndex(mod(index, slides.length));
  };

  const handleChangeInfiniteIndex = index => {
    if (!isFocused) return;
    onChange(index);
    setInfiniteIndex(index);
    handleChangeSelectedIndex(index);
  };

  const manualChageSlideLeft = () => {
    if (!isFocused) return;
    onChange(infiniteIndex - 1);
    handleChangeInfiniteIndex(infiniteIndex - 1);
  };

  const manualChageSlideRight = () => {
    if (!isFocused) return;
    onChange(infiniteIndex + 1);
    handleChangeInfiniteIndex(infiniteIndex + 1);
  };

  const slideRenderer = params => {
    const { index, key } = params;
    const circularIndex = mod(index, slides.length);

    return (
      <Slide
        key={key}
        index={circularIndex}
        link={slides[circularIndex].link}
        image={slides[circularIndex].image}
        title={slides[circularIndex].title}
        description={slides[circularIndex].description}
      />
    );
  };

  return (
    <div className={classNames(className, 'slider')}>
      <EnhancedSwipeableViews
        springConfig={{
          duration: '0.6s',
          easeFunction: 'ease',
          delay: '0s',
        }}
        index={infiniteIndex}
        onChangeIndex={handleChangeInfiniteIndex}
        enableMouseEvents
        interval={7000}
        className="enhanced-swipeable-views"
        slideRenderer={slideRenderer}
        direction={direction}
        autoplay={autoPlay}
      />

      <div className="indicators-wrapper">
        <div tabIndex={0} role="button" className="slider__left-click" onClick={manualChageSlideLeft}>
          <img src="/svg/angle-left.svg" alt="angle-left" />
        </div>
        {slides.map((item, index) => {
          const statusClass = index === selectedIndex ? 'activated' : 'deactivated';
          return (
            <div key={index} className="indicator-button" onClick={() => handleChangeInfiniteIndex(index)}>
              <div className={classNames('indicator', statusClass)} />
            </div>
          );
        })}
        <div tabIndex={0} role="button" className="slider__right-click" onClick={manualChageSlideRight}>
          <img src="/svg/angle-left.svg" alt="angle-right" />
        </div>
      </div>
    </div>
  );
};

Slider.propTypes = {
  slides: PropTypes.array.isRequired,
  className: PropTypes.string,
  autoPlay: PropTypes.bool,
  direction: PropTypes.string,
  onChange: PropTypes.func,
};

Slider.defaultProps = {
  className: '',
  direction: 'incremental', // decremental
  autoPlay: false,
  onChange: () => undefined,
};

export default Slider;
