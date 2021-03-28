import React from 'react';
// import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const MoneyComponent = () => {
  const { t } = useTranslation();

  return (
    <div className="content-block">
      <h5 className="content-block__title">{t('auditDashboard:money.title')}</h5>
      <div className="content-block__columns mb-0">
        <div className="content-block__column">
          <h6 className="content-block__column-title">{t('auditDashboard:money.paidSearch')}</h6>
          <p className="content-block__text medium purple">$69,454</p>
          <h6 className="content-block__column-title">{t('auditDashboard:money.affiliate')}</h6>
          <p className="content-block__text medium purple">$21,414</p>
        </div>
        <div className="content-block__column">
          <h6 className="content-block__column-title">{t('auditDashboard:money.emailCartAbandonment')}</h6>
          <p className="content-block__text medium purple">$18,000</p>
          <h6 className="content-block__column-title">{t('auditDashboard:money.displayPaidSocial')}</h6>
          <p className="content-block__text medium purple">$60,000</p>
        </div>
      </div>
    </div>
  );
};

MoneyComponent.propTypes = {};

MoneyComponent.defaultProps = {};

export default MoneyComponent;
