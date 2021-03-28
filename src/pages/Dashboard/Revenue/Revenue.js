import React from 'react';
import { Line as Chart } from 'react-chartjs-2';
import { revenueChartOptions, CHART_HEIGHT } from 'constants/dashboard';

const Revenue = () => (
  <>
    <div className="dashboard-chart-wrapper">
      <Chart redraw height={CHART_HEIGHT} data={revenueChartOptions.data} options={revenueChartOptions.options} />
    </div>
    <div className="dashboard-chart__descr">
      <div className="dashboard-chart__decsr-item black">Actual Revenue</div>
      <div className="dashboard-chart__decsr-item dash-grey">Your Forecast Goal</div>
      <div className="dashboard-chart__decsr-item grey">Last Year’s Revenue</div>
    </div>
  </>
);

export default Revenue;
