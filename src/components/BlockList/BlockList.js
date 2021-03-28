import React from 'react';
import PropTypes from 'prop-types';
import { AUDIT_CHANNELS_COMPLETE } from 'constants/audit';

import classNames from 'classnames';

import './BlockList.styles.less';

export const BlockList = React.memo(({ items, className, handleClick, step }) => (
  <div className={classNames('block-list', className)}>
    {items.length &&
      items.map(item => (
        <div
          role="button"
          onClick={() => handleClick(item)}
          key={item.name}
          tabIndex={0}
          className={classNames('block-list__item', item.name)}
        >
          <div className={classNames('block-list__indicator', { isActive: step === AUDIT_CHANNELS_COMPLETE })}>
            Connected
          </div>
          <div>
            <img className="block-list__item-inner" src={`/images/${item.image}`} alt="Shopify logo" />
          </div>
        </div>
      ))}
  </div>
));

BlockList.propTypes = {
  items: PropTypes.array,
  className: PropTypes.string,
  handleClick: PropTypes.func,
  step: PropTypes.string.isRequired,
};

BlockList.defaultProps = {
  items: [],
  className: '',
  handleClick: () => undefined,
};

export default BlockList;
