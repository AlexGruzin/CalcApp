import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Doughnut as Chart } from 'react-chartjs-2';
import { REVENUE_CHART_OPTIONS, REVENUE_CHART_LEGEND, REVENUE_CHART_HEIGHT } from 'constants/auditDashboard';

const RevenueComponent = ({ data }) => {
  const { t } = useTranslation();

  return (
    <div className="content-block">
      <h5 className="content-block__title">{t('auditDashboard:revenue.title')}</h5>
      <div className="content-block__revenue">
        <div className="content-block__revenue-wrap">
          <Chart
            height={REVENUE_CHART_HEIGHT}
            data={REVENUE_CHART_OPTIONS.data}
            options={REVENUE_CHART_OPTIONS.options}
          />
        </div>
        <div className="content-block__revenue-history">
          {REVENUE_CHART_LEGEND.map((item, index) => (
            <div className="content-block__revenue-history-item" key={`${item.value}${index}`}>
              <div className="content-block__revenue-icon" style={{ backgroundColor: `${item.color}` }} />
              <span className="content-block__revenue-content">{item.label}</span>
              <span className="content-block__revenue-price">{`$${data[item.value]}`}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

RevenueComponent.propTypes = {
  data: PropTypes.object,
};

RevenueComponent.defaultProps = {
  data: {},
};

export default RevenueComponent;
