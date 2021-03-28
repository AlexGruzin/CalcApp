import * as Routing from 'constants/routing';

export const NAVIGATION_OPTIONS = [
  {
    label: 'app:nav.dashboard',
    route: Routing.DASHBOARD,
    icon: 'dashboard-icon',
  },
  {
    label: 'app:nav.forecast',
    route: Routing.FORECAST,
    icon: 'forecast-icon',
  },
  {
    label: 'app:nav.audit',
    route: Routing.AUDIT_DASHBOARD,
    icon: 'audit-icon',
  },
  // {
  //   label: 'app:nav.labaratory',
  //   route: '/labaratory',
  //   icon: 'labaratory-icon',
  // },
  {
    label: 'app:nav.campaigns',
    route: Routing.CAMPAIGNS,
    icon: 'campaigns-icon',
  },
  // {
  //   label: 'app:nav.connections',
  //   route: '/connections',
  //   icon: 'connections-icon',
  // },
  {
    label: 'app:nav.settings',
    route: Routing.SETTINGS,
    icon: 'settings-icon',
  },
];

export const AUDIT_NAVIGATION_OPTIONS = [
  {
    label: 'app:nav.dashboard',
    route: Routing.DASHBOARD,
    icon: 'dashboard-icon',
  },
];

export const CHART_HEIGHT = 250;

export const revenueChartOptions = {
  data: {
    datasets: [
      {
        label: '0',
        fill: false,
        lineTension: 0,
        backgroundColor: 'transparent',
        borderColor: '#000',
        borderCapStyle: 'square',
        borderDashOffset: 50, // lineDashOffset
        borderJoinStyle: 'bevel',
        borderWidth: 2,
        spanGaps: false,
        pointRadius: 0,
        steppedLine: false,
        data: [0, 120, 160, 200, 220, 230, 450, 480, 510, 520, 550, 600],
      },
      {
        label: '1',
        fill: false,
        lineTension: 0,
        backgroundColor: 'transparent',
        borderColor: '#ccc',
        borderCapStyle: 'square',
        borderDashOffset: 50, // lineDashOffset
        borderJoinStyle: 'bevel',
        borderWidth: 2,
        spanGaps: false,
        pointRadius: 0,
        steppedLine: false,
        data: [0, 100, 250, 280, 320, 350, 400],
      },
      {
        label: '2',
        fill: false,
        lineTension: 0,
        backgroundColor: 'transparent',
        borderColor: '#ccc',
        borderCapStyle: 'square',
        borderDash: [5, 5],
        borderDashOffset: 50, // lineDashOffset
        borderJoinStyle: 'bevel',
        borderWidth: 2,
        spanGaps: false,
        pointRadius: 0,
        steppedLine: false,
        data: [0, 100, 200, 300, 400, 500, 600],
      },
    ],
    xLabels: ['12am', '', '6am', '', '12pm', '', '6pm'],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
    scales: {
      yAxes: [
        {
          gridLines: {
            color: 'rgba(0, 0, 0, 0)',
            drawTicks: false,
            display: 'none',
          },
          ticks: {
            callback() {
              return '';
            },
          },
        },
      ],
      xAxes: [
        {
          ticks: {
            fontSize: 12,
            padding: 10,
          },
        },
      ],
    },
  },
};

export const campaignChartOptions = {
  data: {
    datasets: [
      {
        fill: false,
        lineTension: 0,
        backgroundColor: 'transparent',
        borderColor: '#76fffe',
        borderCapStyle: 'square',
        borderDashOffset: 50, // lineDashOffset
        borderJoinStyle: 'bevel',
        borderWidth: 2,
        spanGaps: false,
        pointRadius: 0,
        steppedLine: false,
        data: [0, 10, 40, 70, 100, 90, 170],
      },
    ],
    xLabels: ['12am', '', '6am', '', '12pm', '', '6pm'],
  },
  options: {
    maintainAspectRatio: false,
    responsive: true,
    legend: {
      display: false,
    },
    scales: {
      yAxes: [
        {
          ticks: {
            callback() {
              return '';
            },
          },
        },
      ],
    },
  },
};

export const channelChartOptions = {
  data: {
    datasets: [],
    xLabels: ['12am', '', '6am', '', '12pm', '', '6pm'],
  },
  options: {
    maintainAspectRatio: false,
    responsive: true,
    legend: {
      display: false,
    },
    scales: {
      yAxes: [
        {
          ticks: {
            callback() {
              return '';
            },
          },
        },
      ],
    },
  },
};

export const SPEND_DATA = [
  {
    title: 'Spend for Today',
    price: '$57,893',
    texts: [
      {
        label: 'purple',
        price: '$62,526',
        descr: 'budgeted for today',
      },
      {
        label: 'green',
        price: '-7.41%',
        descr: 'decrease from plan',
      },
    ],
  },
  {
    title: 'Spend MTD',
    price: '$1,315,864',
    texts: [
      {
        label: 'purple',
        price: '$1,213,449',
        descr: 'budgeted for MTD',
      },
      {
        label: 'red',
        price: '8.44%',
        descr: 'increase from plan',
      },
    ],
  },
  {
    title: 'Revenue for Today',
    price: '$84,728',
    texts: [
      {
        label: 'purple',
        price: '$72,631',
        descr: 'forecast for today',
      },
      {
        label: 'green',
        price: '15.37%',
        descr: 'increase from plan',
      },
    ],
  },
  {
    title: 'Revenue MTD',
    price: '$1,689,789',
    texts: [
      {
        label: 'purple',
        price: '$2,095,010',
        descr: 'forecast for MTD',
      },
      {
        label: 'red',
        price: '-19.34%',
        descr: 'decrease from plan',
      },
    ],
  },
];

export const OVERALL_PERFOMANCE = [
  {
    title: 'Sessions',
    price: '41,211',
  },
  {
    title: 'Conversion Rate',
    price: '1.09%',
  },
  {
    title: 'Orders',
    price: '448',
  },
  {
    title: 'AOV',
    price: '$129.23',
  },
  {
    title: 'Units',
    price: '1085',
  },
  {
    title: 'UPT',
    price: '2.42',
  },
  {
    title: 'AUP',
    price: '$53',
  },
  {
    title: 'ROAS',
    price: '8.9',
  },
];

export const NEXT_MOUNTS_CAMPAIGNS = [
  {
    title: 'Upcoming Campaigns',
    price: '28',
  },
  {
    title: 'Approved Campaigns',
    price: '2/28',
  },
  {
    title: 'Need Attention',
    price: '18/28',
  },
];

export const DEFAULT_TAB = '0';

export const ITEM_TYPE = 'active';
