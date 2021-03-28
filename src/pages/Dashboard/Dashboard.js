import React, { useState, useEffect, useCallback } from 'react';
// import PropTypes from 'prop-types';
import Button from 'components/Button';
import SemiHeader from 'components/SemiHeader';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import * as Routing from 'constants/routing';
import { Bar as Chart } from 'react-chartjs-2';
import CalendarInput from 'components/CalendarInput';
import { SPEND_DATA, OVERALL_PERFOMANCE, NEXT_MOUNTS_CAMPAIGNS, DEFAULT_TAB, ITEM_TYPE } from 'constants/dashboard';
import { CHART_HEIGHT, campaignsChartOptions } from 'constants/campaigns';
import WarningBlock from 'components/WarningBlock';
import RevenueChart from './Revenue/Revenue';
import CampaignChart from './Campaign/Campaign';
import ChannelChart from './Channel/Channel';

import './Dashboard.styles.less';

const attentionCount = 18;

const Dashboard = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const [tabIndex, setTabIndex] = useState(DEFAULT_TAB);
  const [performanceContent, setPerformanceContent] = useState();

  useEffect(() => {
    switch (tabIndex) {
      case '0':
        setPerformanceContent(<RevenueChart />);
        break;
      case '1':
        setPerformanceContent(<CampaignChart />);
        break;
      case '2':
        setPerformanceContent(<ChannelChart />);
        break;
      default:
        setPerformanceContent(<RevenueChart />);
        break;
    }
  }, [tabIndex]);

  useEffect(() => {
    const tabs = document.querySelectorAll('.dashboard-card__tab');
    tabs.forEach(item => {
      item.classList.remove(ITEM_TYPE);
      if (item.value === tabIndex) {
        item.classList.add(ITEM_TYPE);
      }
    });
  });

  const handleChangeTab = useCallback(event => {
    setTabIndex(event.target.value);
  }, []);

  return (
    <div className="dashboard">
      <SemiHeader className="dashboard__semi-header" label={t('dashboard:dashboard')} brand="Clothing Brand X" />
      <div className="dashboard__content">
        <div className="dashboard__warning-block">
          <WarningBlock
            text={`${t('dashboard:oh')} ${attentionCount} ${t('dashboard:attention')}`}
            buttonText={t('dashboard:goToCampaign')}
            route={Routing.CAMPAIGNS}
            textBeforeButton={t('dashboard:quick')}
          />
        </div>
        <div className="dashboard__performance">
          <div className="dashboard-card">
            <h3>{t('dashboard:performanceForecast')}</h3>
            <div className="dashboard-card__head">
              <div className="dashboard-card__tabs">
                <Button className="dashboard-card__tab" value="0" onClick={e => handleChangeTab(e)}>
                  {t('dashboard:revenue')}
                </Button>
                <Button className="dashboard-card__tab" value="1" onClick={e => handleChangeTab(e)}>
                  {t('dashboard:campaign')}
                </Button>
                <Button className="dashboard-card__tab" value="2" onClick={e => handleChangeTab(e)}>
                  {t('dashboard:channel')}
                </Button>
              </div>
              <div className="dashboard-card__calendar">
                <span>{t('dashboard:dateRangeLabel')}</span>
                <CalendarInput />
              </div>
            </div>
            {performanceContent}
            <div className="dashboard-card__footer">
              <div onClick={() => history.push(Routing.FORECAST)}>
                {t('dashboard:editForecast')}
                <img src="/svg/arrow.svg" alt="next" />
              </div>
            </div>
          </div>
        </div>
        <div className="dashboard__block grey">
          <h2>{t('dashboard:spendRevenue')}</h2>
          <div className="columns columns_four">
            {SPEND_DATA.map((item, index) => (
              <div className="columns__item" key={`${item.title}${index}`}>
                <div className="dashboard-card">
                  <h2 className="dashboard-card__title">{item.title}</h2>
                  <h2 className="dashboard-card__price">{item.price}</h2>
                  <div className="dashboard-card__line" />
                  {item.texts.map((text, i) => (
                    <div className="dashboard-card__text" key={text.descr + i}>
                      <span className={text.label}>{text.price}</span> {text.descr}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <h2>{t('dashboard:overallPerformance')}</h2>
          <div className="columns columns_eight">
            {OVERALL_PERFOMANCE.map((item, index) => (
              <div className="columns__item" key={`${item.title}${index}`}>
                <div className="dashboard-card dashboard-card_small">
                  <h4 className="dashboard-card__title">{item.title}</h4>
                  <h2 className="dashboard-card__price">{item.price}</h2>
                </div>
              </div>
            ))}
          </div>
          <div className="columns columns_two">
            <div className="columns__item">
              <h2>{t('dashboard:channelPerformance')}</h2>
              <div className="dashboard-card">
                <div className="dashboard-card__chart-wrapper">
                  <Chart
                    height={CHART_HEIGHT}
                    redraw
                    data={campaignsChartOptions.data}
                    options={campaignsChartOptions.options}
                  />
                </div>
                <div className="dashboard-card__chart-footer">
                  <div className="dashboard-card__chart-info">
                    <div className="dashboard-card__chart-info-item">
                      <div className="square square_fiolet" />
                      Spend
                    </div>
                    <div className="dashboard-card__chart-info-item">
                      <div className="square square_purple" />
                      Revenue
                    </div>
                  </div>
                  <div className="dashboard-card__footer" onClick={() => history.push(Routing.FORECAST)}>
                    {t('dashboard:channelReport')}
                    <img src="/svg/arrow.svg" alt="next" />
                  </div>
                </div>
              </div>
            </div>
            <div className="columns__item">
              <h2>{t('dashboard:campaignPerformance')}</h2>
              <div className="dashboard-card">
                <div className="dashboard-card__chart-wrapper">
                  <Chart
                    height={CHART_HEIGHT}
                    redraw
                    data={campaignsChartOptions.data}
                    options={campaignsChartOptions.options}
                  />
                </div>
                <div className="dashboard-card__chart-footer">
                  <div className="dashboard-card__chart-info">
                    <div className="dashboard-card__chart-info-item">
                      <div className="square square_fiolet" />
                      Spend
                    </div>
                    <div className="dashboard-card__chart-info-item">
                      <div className="square square_purple" />
                      Revenue
                    </div>
                  </div>
                  <div className="dashboard-card__chart-button" onClick={() => history.push(Routing.FORECAST)}>
                    {t('dashboard:campaignReport')}
                    <img src="/svg/arrow.svg" alt="next" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <h2>{t('dashboard:nextMonth')}</h2>
          <div className="columns columns_two">
            <div className="columns__item">
              <div className="dashboard-card">
                {NEXT_MOUNTS_CAMPAIGNS.map((item, index) => (
                  <div key={`${item.title}${index}`}>
                    <h3 className="dashboard-card__title">{item.title}</h3>
                    <h2 className="dashboard-card__price">{item.price}</h2>
                  </div>
                ))}
                <div className="dashboard-card__chart-footer">
                  <div />
                  <div className="dashboard-card__chart-button" onClick={() => history.push(Routing.FORECAST)}>
                    {t('dashboard:channelReport')}
                    <img src="/svg/arrow.svg" alt="next" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Dashboard.propTypes = {};

Dashboard.defaultProps = {};

export default Dashboard;
