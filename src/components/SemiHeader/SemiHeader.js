import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import LogoutButton from 'components/LogoutButton';
import NotificationsHistory from 'components/NotificationsHistory';
import { isInIframe } from 'helpers/routing';
import { getAccessToken, getRefreshToken } from 'helpers/services/storage';
import { NOTIFICATIONS_TYPES } from 'components/NotificationsHistory/notifications';

import './SemiHeader.styles.less';

const SemiHeader = ({ className, brand, label }) => (
  <div className={classNames('header', className)}>
    <div className="header__inner">
      <div className="header__label">{label}</div>
      <div className="header__right">
        <div className="header__brand">{brand}</div>
        <NotificationsHistory
          // TODO Remove mock after demo and styles finalyzed
          data={[
            {
              id: 1,
              date: new Date(),
              type: NOTIFICATIONS_TYPES.SURVEY,
              read: false,
            },
            {
              id: 2,
              date: new Date(),
              type: NOTIFICATIONS_TYPES.AUDIT_READY,
              read: false,
            },
          ]}
        />
        {getAccessToken() && getRefreshToken() && <LogoutButton display={!isInIframe()} />}
      </div>
    </div>
    <hr className="header__line" />
  </div>
);

SemiHeader.propTypes = {
  className: PropTypes.string,
  brand: PropTypes.string,
  label: PropTypes.string,
};

SemiHeader.defaultProps = {
  className: '',
  brand: '',
  label: '',
};

export default SemiHeader;
