import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const LastYearComponent = ({ lastYearAdSpend, lastYearRevenue }) => {
  const { t } = useTranslation();

  return (
    <div className="content-block">
      <div className="content-block__title-icon">
        <h5 className="content-block__title">{t('auditDashboard:lastYear.title')}</h5>
        <img className="forecast__info-svg" src="/svg/info-circle-black.svg" alt="info-svg" />
      </div>
      <h2 className="content-block__text large purple">{`$${lastYearAdSpend}`}</h2>
      <h5 className="content-block__title">{t('auditDashboard:lastYear.revenueTitle')}</h5>
      <h2 className="content-block__text large purple">{`$${lastYearRevenue}`}</h2>
    </div>
  );
};

LastYearComponent.propTypes = {
  lastYearAdSpend: PropTypes.number.isRequired,
  lastYearRevenue: PropTypes.number.isRequired,
};

LastYearComponent.defaultProps = {};

export default LastYearComponent;
