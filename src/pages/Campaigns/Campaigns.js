import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Bar as Chart } from 'react-chartjs-2';
import CustomSelect from 'components/CustomSelect';
import SemiHeader from 'components/SemiHeader';
import { useTranslation } from 'react-i18next';
import { useTranslateOptions } from 'helpers/customHooks';
import CalendarInput from 'components/CalendarInput';
import {
  ORDER_BY,
  CAMPAIGN_TYPE,
  FUNNEL,
  STATUS,
  NEXT_MONTH_ITEMS,
  CHART_HEIGHT,
  campaignsChartOptions,
} from 'constants/campaigns';
import CampaignsTable from './CampaignsTable/CampaignsTable';
import './Campaigns.styles.less';

const Campaigns = ({ allCampaigns, getAllCampaigns, isLoading }) => {
  const { t } = useTranslation();
  const translatedOrderByOptions = useTranslateOptions(ORDER_BY);
  const translatedTypeOptions = useTranslateOptions(CAMPAIGN_TYPE);
  const translatedFunnelOptions = useTranslateOptions(FUNNEL);
  const translatedStatusOptions = useTranslateOptions(STATUS);
  const [tempData, setTempData] = useState({
    order: translatedOrderByOptions[0],
    type: translatedTypeOptions[0],
    funnel: translatedFunnelOptions[0],
    status: translatedStatusOptions[0],
  });

  useEffect(() => {
    getAllCampaigns();
  }, [getAllCampaigns]);

  const onChangeOrderBy = ({ value }) => {
    setTempData(prevState => ({ ...prevState, order: value }));
  };

  const onChangeType = ({ value }) => {
    setTempData(prevState => ({ ...prevState, type: value }));
  };

  const onChangeFunnel = ({ value }) => {
    setTempData(prevState => ({ ...prevState, funnel: value }));
  };

  const onChangeStatus = ({ value }) => {
    setTempData(prevState => ({ ...prevState, status: value }));
  };

  const currentOrderBy = translatedOrderByOptions.find(item => item.value === tempData.order);
  const currentType = translatedTypeOptions.find(item => item.value === tempData.type);
  const currentFunnel = translatedFunnelOptions.find(item => item.value === tempData.funnel);
  const currentStatus = translatedStatusOptions.find(item => item.value === tempData.status);

  return (
    <div className="campaigns">
      <SemiHeader className="campaigns__semi-header" label={t('campaigns:campaigns')} brand="Clothing Brand X" />
      <div className="campaigns__content">
        <div className="campaigns__chart-block">
          <div className="campaigns__setup-column">
            <h2>
              {t('campaigns:title')}
              <span> {t('campaigns:pinkTitle')}</span>
            </h2>
            <h3 className="campaigns__subtitle">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam nec dui vestibulum, facilisis nisl sit
              amet, tempor justo.
            </h3>
            <div className="campaigns__info">
              <div className="campaigns__info-left">
                <h3>{t('campaigns:live')}</h3>
                <CustomSelect
                  label={t('campaigns:orderByTitle')}
                  options={translatedOrderByOptions}
                  value={currentOrderBy || translatedOrderByOptions[0]}
                  onChange={onChangeOrderBy}
                  className="campaigns__select"
                />
                <div className="campaigns__chart-wrapper">
                  <Chart
                    height={CHART_HEIGHT}
                    redraw
                    data={campaignsChartOptions.data}
                    options={campaignsChartOptions.options}
                  />
                </div>
                <div className="campaigns__chart-info">
                  <div className="campaigns__chart-info-item">
                    <div className="square square_fiolet" />
                    Spend
                  </div>
                  <div className="campaigns__chart-info-item">
                    <div className="square square_purple" />
                    Revenue
                  </div>
                </div>
              </div>
              <div className="campaigns__info-right">
                <h3>
                  <span>28 </span>
                  Campaigns to Launch Next Month
                </h3>
                <div className="campaigns__next-month">
                  <h3>
                    <span>18 </span>
                    Campaigns Need Attention
                  </h3>
                  <ul className="campaigns__next-month-items">
                    {NEXT_MONTH_ITEMS.map((item, i) => (
                      <li className="campaigns__next-month-item" key={item.title + i}>
                        <img className="forecast__info-svg" src="/svg/success.svg" alt="info-svg" />
                        <h4 className="campaigns__next-month-title">{item.title}</h4>
                        <h5 className="campaigns__next-month-subtitle">{item.subtitle}</h5>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="campaigns__chart-block">
          <div className="campaigns__setup-column">
            <h3>{t('campaigns:schedule')}</h3>
            <h4>{t('campaigns:filterBy')}</h4>

            <div className="campaigns__settings">
              <CalendarInput label={t('campaigns:dateRangeLabel')} />
              <CustomSelect
                label={t('campaigns:campaignTypeLabel')}
                options={translatedTypeOptions}
                value={currentType || translatedTypeOptions[0]}
                onChange={onChangeType}
                className="campaigns__select"
              />
              <CustomSelect
                label={t('campaigns:funnelLabel')}
                options={translatedFunnelOptions}
                value={currentFunnel || translatedFunnelOptions[0]}
                onChange={onChangeFunnel}
                className="campaigns__select"
              />
              <CustomSelect
                label={t('campaigns:statusLabel')}
                options={translatedStatusOptions}
                value={currentStatus || translatedStatusOptions[0]}
                onChange={onChangeStatus}
                className="campaigns__select"
              />
            </div>
            {isLoading ? 'Loading' : <CampaignsTable allCampaigns={allCampaigns} />}
          </div>
        </div>
      </div>
    </div>
  );
};

Campaigns.propTypes = {
  getAllCampaigns: PropTypes.func.isRequired,
  allCampaigns: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

Campaigns.defaultProps = {};

export default Campaigns;
