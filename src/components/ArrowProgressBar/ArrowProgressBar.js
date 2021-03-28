import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import './ArrowProgressBar.styles.less';

const items = [
  {
    number: 0,
    label: 'Step 1',
    description: 'Connect to our Catalogue',
  },
  {
    number: 1,
    label: 'Step 2',
    description: 'Connect to our Analytics',
  },
  {
    number: 2,
    label: 'Step 3',
    description: 'Connect to our Channels',
  },
];

export const ArrowProgressBar = React.memo(({ activeIndex, className, handleSort }) => {
  const [actualItems, setActualItems] = useState([]);

  useEffect(() => {
    if (handleSort) setActualItems(items.sort(handleSort));
    const updatedItems = items.map((item, index) => ({
      ...item,
      isActive: index === activeIndex,
      isPast: index < activeIndex,
      isFuture: index > activeIndex,
    }));
    setActualItems(updatedItems);
  }, [activeIndex, handleSort]);

  return (
    <div className={classNames('arrow-bar', className)}>
      {actualItems.length &&
        actualItems.map((item, index) => {
          const { isActive, isPast, isFuture } = item;
          return (
            <div
              key={item.label}
              className={classNames('arrow-bar__item', { isActive, isPast, isFuture })}
              style={{ zIndex: items.length - index }}
            >
              <div className={classNames('arrow-bar__number')}>{item.number + 1}</div>
              <div className="arrow-bar__content">
                <div className="arrow-bar__label">{item.label}</div>
                <div className="arrow-bar__description">{item.description}</div>
              </div>
            </div>
          );
        })}
    </div>
  );
});

ArrowProgressBar.propTypes = {
  className: PropTypes.string,
  handleSort: PropTypes.func,
  activeIndex: PropTypes.number.isRequired,
};

ArrowProgressBar.defaultProps = {
  className: '',
  handleSort: null,
};

export default ArrowProgressBar;
