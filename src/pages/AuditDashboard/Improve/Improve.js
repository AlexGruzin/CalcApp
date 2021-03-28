import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import * as Routing from 'constants/routing';
import { Doughnut as Chart, Bar as ChartBar, HorizontalBar as ChartHorizontalBar } from 'react-chartjs-2';
import { useHistory } from 'react-router-dom';
import Button from 'components/Button';
import {
  IMPROVE_FIRST_TAB,
  IMPROVE_SECOND_TAB,
  IMPROVE_THIRD_TAB,
  IMPROVE_CHART_OPTIONS,
  IMPROVE_UPDATE_CHART_OPTIONS,
  IMPROVE_CHART_WIDTH,
  IMPROVE_CHART_HEIGHT,
  IMPROVE_CHARTBAR_OPTIONS,
  IMPROVE_CHARTBAR_WIDTH,
  IMPROVE_CHARTBAR_HEIGHT,
  IMPROVE_CHARTBAR_HORIZONT_OPTIONS,
} from 'constants/auditDashboard';

const Improve = ({ data }) => {
  const { t } = useTranslation();
  const history = useHistory();
  const [improveVariant, setImproveVariant] = useState(IMPROVE_FIRST_TAB);

  const handleClickImprove = e => {
    setImproveVariant(e);
  };

  return (
    <div className="content-block">
      <h5 className="content-block__title">{t('auditDashboard:improve.title')}</h5>
      <ul className="content-block__list">
        {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role */}
        <li className="content-block__list-item" role="button" onClick={() => handleClickImprove(0)}>
          <h4>{t('auditDashboard:improve.increaseAudience')}</h4>
          {improveVariant === IMPROVE_FIRST_TAB && (
            <>
              <p>{t('auditDashboard:improve.increaseAudienceDescr')}</p>
              <div className="content-block__chart-wrap">
                <div className="content-block__chart">
                  <Chart
                    width={IMPROVE_CHART_WIDTH}
                    height={IMPROVE_CHART_HEIGHT}
                    data={IMPROVE_CHART_OPTIONS.data}
                    options={IMPROVE_CHART_OPTIONS.options}
                  />
                </div>
                <img src="/svg/arrowRight.svg" alt="arrowRight" />
                <div className="content-block__chart">
                  <Chart
                    width={IMPROVE_CHART_WIDTH}
                    height={IMPROVE_CHART_HEIGHT}
                    data={IMPROVE_UPDATE_CHART_OPTIONS.data}
                    options={IMPROVE_UPDATE_CHART_OPTIONS.options}
                  />
                </div>
              </div>
              <div className="content-block__chart-descrs">
                <div className="content-block__chart-descr">
                  <p>Your current Audience size: 4,324 shoppers</p>
                </div>
                <div className="content-block__chart-descr">
                  <p>In one year, we will increase your audience to over 9,945 shoppers</p>
                </div>
              </div>
            </>
          )}
        </li>
        {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role */}
        <li className="content-block__list-item" role="button" onClick={() => handleClickImprove(1)}>
          <h4>{t('auditDashboard:improve.increaseCustomer')}</h4>
          {improveVariant === IMPROVE_SECOND_TAB && (
            <>
              <p>{t('auditDashboard:improve.increaseCustomerDescr')}</p>
              <div className="content-block__chart-wrap">
                <div className="content-block__chart">
                  <ChartHorizontalBar
                    width={IMPROVE_CHARTBAR_WIDTH}
                    height={IMPROVE_CHARTBAR_HEIGHT}
                    data={IMPROVE_CHARTBAR_HORIZONT_OPTIONS.data}
                    options={IMPROVE_CHARTBAR_HORIZONT_OPTIONS.options}
                  />
                </div>
              </div>
            </>
          )}
        </li>
        {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role */}
        <li className="content-block__list-item" role="button" onClick={() => handleClickImprove(2)}>
          <h4>{t('auditDashboard:improve.decreaseMarketing')}</h4>
          {improveVariant === IMPROVE_THIRD_TAB && (
            <>
              <p>{t('auditDashboard:improve.increaseAudienceDescr')}</p>
              <div className="content-block__chart-wrap">
                <div className="content-block__chart">
                  <ChartBar
                    width={IMPROVE_CHARTBAR_WIDTH}
                    height={IMPROVE_CHARTBAR_HEIGHT}
                    data={IMPROVE_CHARTBAR_OPTIONS.data}
                    options={IMPROVE_CHARTBAR_OPTIONS.options}
                  />
                </div>
              </div>
              <div className="content-block__chart-descrs">
                <div className="content-block__chart-descr fullWidth">
                  <p>You spent $10,397 last year to generate $20,000 worth of sales.</p>
                </div>
                <div className="content-block__chart-descr fullWidth">
                  <p>We spend 17% less and keep the same revenue.</p>
                </div>
              </div>
            </>
          )}
        </li>
      </ul>
      <div className="content-block__footer">
        <Button className="content-block__button blue" onClick={() => history.push(Routing.FORECAST)}>
          {t('auditDashboard:improve.nextStep')}
        </Button>
      </div>
    </div>
  );
};

Improve.propTypes = {
  data: PropTypes.object,
};

Improve.defaultProps = {
  data: {},
};

export default Improve;
