import React from 'react';
import { Line as Chart } from 'react-chartjs-2';
import { campaignChartOptions, CHART_HEIGHT } from 'constants/dashboard';

const Campaign = () => (
  <>
    <div className="dashboard-chart-wrapper">
      <Chart redraw height={CHART_HEIGHT} data={campaignChartOptions.data} options={campaignChartOptions.options} />
    </div>
    <div className="dashboard-chart__color-descr">
      <span className="dashboard-chart__color-item orange">Brand Awareness</span>
      <span className="dashboard-chart__color-item yellow">Category Awareness</span>
      <span className="dashboard-chart__color-item green">Smart Shopping</span>
      <span className="dashboard-chart__color-item blue-light">Competition</span>
      <span className="dashboard-chart__color-item blue">Retargeting</span>
      <span className="dashboard-chart__color-item fio">Re-engagement</span>
      <span className="dashboard-chart__color-item purple">Prostpecting</span>
    </div>
  </>
);

export default Campaign;
