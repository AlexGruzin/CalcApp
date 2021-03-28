import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
// import { CUSTOMERS_DATA } from 'constants/auditDashboard';
import MapChart from '../MapChart.js';

const CustomersComponent = ({ data }) => {
  const { t } = useTranslation();

  const firstFiveCities = data.length ? data.slice(0, 5) : [];

  return (
    <div className="content-block">
      <div className="content-block__title-icon">
        <h5 className="content-block__title">{t('auditDashboard:customers.title')}</h5>
        <img className="content-block__info-svg" src="/svg/info-circle-black.svg" alt="info-svg" />
      </div>
      <div className="content-block__map-wrap">
        <MapChart />
      </div>
      <div className="content-block__table">
        <div className="content-block__table-head">
          <div>{t('auditDashboard:customers.city')}</div>
          <div>{t('auditDashboard:customers.revenue')}</div>
        </div>
        <div className="content-block__table-body">
          {firstFiveCities.map((item, index) => (
            <div className="content-block__table-row" key={`${item.city}${index}`}>
              <div>
                {index + 1}. {item.city}
              </div>
              <div>$ {item.value}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="content-block__footer">
        {t('auditDashboard:seeMore')}
        <img src="/svg/arrow-black.svg" alt="next" />
      </div>
    </div>
  );
};

CustomersComponent.propTypes = {
  data: PropTypes.array,
};

CustomersComponent.defaultProps = {
  data: [],
};

export default CustomersComponent;
