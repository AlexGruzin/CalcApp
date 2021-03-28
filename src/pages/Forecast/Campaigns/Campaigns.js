import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { TYPES_ICONS } from 'constants/campaigns';
import { ADVERT_ICONS } from 'constants/advertisment';

import './Campaigns.styles.less';
import { useTranslation } from 'react-i18next';

const Campaigns = ({ items }) => {
  const { t } = useTranslation();

  const campaignsCards = useCallback(() => {
    if (!items.length) return null;

    return items.map(item => (
      <div key={item.label} className="campaigns__card">
        <div className="campaigns__label-row">
          <div className="campaigns__status-block">
            <div className={classNames('campaigns__indicator', { isActive: item.status >= 1 })} />
            <div className={classNames('campaigns__indicator', { isActive: item.status >= 2 })} />
            <div className={classNames('campaigns__indicator', { isActive: item.status >= 3 })} />
          </div>
          <h3>{t(item.label)}</h3>
          {item.type && <img src={`/svg/${TYPES_ICONS[item.type]}`} alt="campaign icon" />}
        </div>
        <div className="campaigns__describe-row">
          <p>{t(item.description)}</p>
        </div>
        <div className="campaigns__suggest-row">
          <h3>{'Suggested Channels'}</h3>
          <div className="campaigns__icons-row">
            {item.icons &&
              item.icons.map(icon => <img key={ADVERT_ICONS[icon]} src={`/svg/${ADVERT_ICONS[icon]}`} alt="icon" />)}
          </div>
        </div>
      </div>
    ));
  }, [items, t]);

  return (
    <div className="campaigns">
      <h3>Suggested Campaigns</h3>
      <div className="campaigns__container">{campaignsCards()}</div>
    </div>
  );
};

Campaigns.propTypes = {
  items: PropTypes.array,
};

Campaigns.defaultProps = {
  items: [],
};

export default Campaigns;
