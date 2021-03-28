import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

import './CampaignsTable.styles.less';

const CampaignsTable = ({ items, handleClick }) => {
  const { t } = useTranslation();

  return (
    <div className="table-cmp">
      <div className="table-cmp__description-row">
        <div className={classNames('table-cmp__label', 'description')}>
          <span>{t('Campaign')}</span>
        </div>
        <div className={classNames('table-cmp__type', 'description')}>
          <span>{t('Type')}</span>
        </div>
        <div className={classNames('table-cmp__part', 'description')}>
          <span>{t('Part of the Funnel')}</span>
        </div>
        <div className={classNames('table-cmp__status', 'description')}>
          <span>{t('Status')}</span>
        </div>
        <div className={classNames('table-cmp__spend', 'description')}>
          <span>{t('Spend')}</span>
        </div>
        <div className={classNames('table-cmp__roas', 'description')}>
          <span>{t('ROAS')}</span>
        </div>
      </div>

      {items.map(item => (
        <div className="table-cmp__row" onClick={handleClick}>
          <div className={classNames('table-cmp__label', 'item')}>
            <span>{item.label}</span>
          </div>
          <div className={classNames('table-cmp__type', 'item')}>
            <span>{item.type}</span>
          </div>
          <div className={classNames('table-cmp__part', 'item')}>
            <div className="able-cmp__parts">
              {item.part.map(part => (
                <span className={part}>{part}</span>
              ))}
            </div>
          </div>
          <div className={classNames('table-cmp__status', 'item')}>
            <span>{item.status}</span>
          </div>
          <div className={classNames('table-cmp__spend', 'item')}>
            <span>{item.spend}</span>
          </div>
          <div className={classNames('table-cmp__roas', 'item')}>
            <span>{item.roas}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

CampaignsTable.propTypes = {
  items: PropTypes.array,
  handleClick: PropTypes.func,
};

CampaignsTable.defaultProps = {
  items: [],
  handleClick: () => {},
};

export default CampaignsTable;
