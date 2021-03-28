import React from 'react';
import { Line as Chart } from 'react-chartjs-2';
import { useTranslation } from 'react-i18next';
import { channelChartOptions, CHART_HEIGHT } from 'constants/dashboard';

const Channel = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className="dashboard-chart-wrapper">
        <Chart redraw height={CHART_HEIGHT} data={channelChartOptions.data} options={channelChartOptions.options} />
      </div>
      <div className="dashboard-chart__color-descr warning">
        <div>
          <img src="/svg/warningTriangle.svg" alt="warning" />
          {t('dashboard:noChannels')}
        </div>
      </div>
    </>
  );
};

export default Channel;
