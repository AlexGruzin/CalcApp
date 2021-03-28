import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import SemiHeader from 'components/SemiHeader';
import LastYear from './LastYear/LastYear';
import Paying from './Paying/Paying';
import Money from './Money/Money';
import Revenue from './Revenue/Revenue';
import Customers from './Customers/Customers';
import Products from './Products/Products';
import Improve from './Improve/Improve';
import Keyword from './Keyword/Keyword';

import './AuditDashboard.styles.less';

const AuditDashboard = ({ reportData }) => {
  const { t } = useTranslation();
  const {
    lastYearAdSpend,
    lastYearRevenue,
    avgCpc,
    revenueByChannel,
    revenueByCity,
    keywordEfficacy,
    adSpendByChannel, // no where to render
    avgKeywordsCore, // no where to render
    goals, // all examples are missing this field
  } = reportData;

  return (
    <div className="audit-dsh" id="auditDashboard">
      <SemiHeader className="audit-dsh__semi-header" label={t('auditDashboard:title')} brand="Clothing Brand X" />
      <div className="audit-dsh__content">
        <div className="audit-dsh__main-block">
          <h4 className="audit-dsh__label">
            {t('auditDashboard:seeHow')} <span>{t('auditDashboard:weCanImprove')}</span>.
          </h4>
          <h3 className="audit-dsh__text">{t('auditDashboard:weTookALook')}</h3>
          <div className="audit-dsh__columns">
            <div className="audit-dsh__column">
              <div className="audit-dsh__block">
                <LastYear lastYearAdSpend={lastYearAdSpend} lastYearRevenue={lastYearRevenue} />
              </div>
              <div className="audit-dsh__block">
                <Paying avgCpc={avgCpc} />
              </div>
              <div className="audit-dsh__block">
                <Money data={adSpendByChannel} />
              </div>
              <div className="audit-dsh__block">
                <Revenue data={revenueByChannel} />
              </div>
            </div>
            <div className="audit-dsh__column">
              <div className="audit-dsh__block">
                <Customers data={revenueByCity} />
              </div>
              <div className="audit-dsh__block">
                <Products />
              </div>
            </div>
            <div className="audit-dsh__column">
              <div className="audit-dsh__block">
                <Improve data={goals} />
              </div>
              <div className="audit-dsh__block">
                <Keyword data={keywordEfficacy} average={avgKeywordsCore} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

AuditDashboard.propTypes = {
  reportData: PropTypes.object.isRequired, // TODO add shape
};

AuditDashboard.defaultProps = {};

export default AuditDashboard;
