import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const PayingComponent = ({ avgCpc }) => {
  const { t } = useTranslation();

  return (
    <div className="content-block">
      <div className="content-block__title-icon">
        <h5 className="content-block__title">{t('auditDashboard:paying.title')}</h5>
        <img className="forecast__info-svg" src="/svg/info-circle-black.svg" alt="info-svg" />
      </div>
      <div className="content-block__columns">
        <div className="content-block__column">
          <h6 className="content-block__column-title">{t('auditDashboard:paying.averageCostPerClick')}</h6>
          <p className="content-block__text medium purple">{`$${avgCpc}`}</p>
        </div>
        <div className="content-block__column">
          <h6 className="content-block__column-title">{t('auditDashboard:paying.averageAdQualityScore')}</h6>
          <p className="content-block__text medium purple">6/10</p>
        </div>
      </div>
      <p className="content-block__text">{t('auditDashboard:paying.weCanLowerYourCost')}</p>
    </div>
  );
};

PayingComponent.propTypes = {
  avgCpc: PropTypes.number.isRequired,
};

PayingComponent.defaultProps = {};

export default PayingComponent;
