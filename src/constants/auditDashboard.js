import allStates from './allStates.json';

export const REVENUE_CHART_OPTIONS = {
  data: {
    datasets: [
      {
        backgroundColor: ['#914bcf', '#db0e8a', '#fe6155', '#ff944b', '#ffc654', '#fcf874', '#0f8672'],
        data: [700, 100, 470, 200, 700, 100, 470],
        label: 1,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    cutoutPercentage: 70,
    legend: {
      display: true,
    },
  },
};

export const IMPROVE_CHART_OPTIONS = {
  data: {
    datasets: [
      {
        backgroundColor: ['#914bcf', '#d8d8d8'],
        data: [400, 700],
        label: 1,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    cutoutPercentage: 50,
    legend: {
      display: true,
    },
  },
};

export const IMPROVE_UPDATE_CHART_OPTIONS = {
  data: {
    datasets: [
      {
        backgroundColor: ['#914bcf', '#db0e8a'],
        data: [400, 700],
        label: 1,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    cutoutPercentage: 50,
    legend: {
      display: true,
    },
  },
};

export const REVENUE_TYPES = {
  EMAIL: 'EMAIL',
  REFERRAL: 'REFERRAL',
  PAID_SEARCH: 'PAID_SEARCH',
  AFFILIATES: 'AFFILIATES',
  DIRECT: 'DIRECT',
  ORGANIC_SEARCH: 'ORGANIC_SEARCH',
  DISPLAY: 'DISPLAY',
  SMS: 'SMS',
  RETARGETING: 'RETARGETING',
  SOCIAL: 'SOCIAL',
  // SEO: 'SEO', // not receiving it
  OTHER: 'OTHER',
};

export const REVENUE_CHART_LEGEND = [
  {
    value: REVENUE_TYPES.PAID_SEARCH,
    label: 'Paid Search',
    color: '#914bcf',
  },
  {
    value: REVENUE_TYPES.EMAIL,
    label: 'Email & Cart Abandonment',
    color: '#db0e8a',
  },
  {
    value: REVENUE_TYPES.AFFILIATES,
    label: 'Affiliate',
    color: '#fe6155',
  },
  {
    label: 'Display - RT - Paid Social',
    value: REVENUE_TYPES.DISPLAY,
    color: '#ff944b',
  },
  // {
  //   value: REVENUE_TYPES.SEO,
  //   label: 'SEO',
  //   color: '#ffc654',
  // },
  {
    label: 'Referral & Social',
    value: REVENUE_TYPES.REFERRAL,
    color: '#fcf874',
  },
  {
    label: 'Direct',
    value: REVENUE_TYPES.DIRECT,
    color: '#0f8672',
  },
];

export const IMPROVE_FIRST_TAB = 0;
export const IMPROVE_SECOND_TAB = 1;
export const IMPROVE_THIRD_TAB = 2;
export const IMPROVE_CHART_WIDTH = 150;
export const IMPROVE_CHART_HEIGHT = 150;
export const REVENUE_CHART_HEIGHT = 150;
export const IMPROVE_CHARTBAR_WIDTH = 350;
export const IMPROVE_CHARTBAR_HEIGHT = 150;
export const MAP_STROKE = '#fff';
export const MAP_FILL = '#ddd';

export const PRODUCTS_ITEMS = [
  {
    position: 'left',
    img: '/images/auditDash1.png',
    contentPurple: 'Women interested in Fitness',
    content: 'account for 45% of your sales.',
  },
  {
    position: 'right',
    img: '/images/auditDash2.png',
    contentPurple: 'Families',
    content: 'account for 32% of your sales.',
  },
  {
    position: 'left',
    img: '/images/auditDash3.png',
    contentPurple: 'Single women who eat healthy',
    content: 'account for 28% of your sales.',
  },
  {
    position: 'right',
    img: '/images/auditDash4.png',
    contentPurple: 'LGBTIA+',
    content: 'account for 24% of your sales.',
  },
];

export const CUSTOMERS_DATA = [
  {
    city: 'New York',
    price: '204,542',
  },
  {
    city: 'San Francisco',
    price: '143,900',
  },
  {
    city: 'Austin',
    price: '71,950',
  },
  {
    city: 'Chicago',
    price: '35,975',
  },
  {
    city: 'Seattle',
    price: '17,987',
  },
];

export const KEYWORD_DATA = [
  {
    spend: 100,
    keyword: 'cat store',
    volume: 80,
  },
  {
    spend: 90,
    keyword: 'cat store online',
    volume: 50,
  },
  {
    spend: 80,
    keyword: 'black cat',
    volume: 20,
  },
  {
    spend: 40,
    keyword: 'grumpy cat gifts',
    volume: 100,
  },
  {
    spend: 90,
    keyword: 'pusheen store',
    volume: 70,
  },
];

export const IMPROVE_CHARTBAR_OPTIONS = {
  data: {
    datasets: [
      {
        backgroundColor: '#7349BE',
        barThickness: 50, // weight line in px
        data: [250, 200],
        label: 1,
      },
      {
        backgroundColor: 'rgba(207, 39, 185, 1)',
        barThickness: 50, // weight line in px
        data: [400, 400],
        label: 2,
      },
    ],
    xLabels: ['', ''],
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
          },
          ticks: {
            callback(value) {
              return value;
            },
            fontSize: 8,
            padding: 10,
            beginAtZero: true,
          },
        },
      ],
      xAxes: [
        {
          gridLines: {
            drawTicks: false,
            borderDashOffset: 7, // why not working?
          },
          ticks: {
            fontSize: 8,
            padding: 10,
          },
        },
      ],
    },
  },
};

export const IMPROVE_CHARTBAR_HORIZONT_OPTIONS = {
  data: {
    datasets: [
      {
        backgroundColor: '#7349BE',
        barThickness: 50, // weight line in px
        categoryPercentage: 0.1,
        data: [250],
        label: 1,
      },
      {
        backgroundColor: 'rgba(207, 39, 185, 1)',
        barThickness: 50, // weight line in px
        categoryPercentage: 1,
        data: [400],
        label: 2,
      },
    ],
    yLabels: ['Current LTV: $400', 'Goal LTV: $920'],
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
          },
          ticks: {
            callback(value) {
              return value;
            },
            fontSize: 15,
            padding: 10,
            beginAtZero: true,
          },
        },
      ],
      xAxes: [
        {
          gridLines: {
            drawTicks: false,
            borderDashOffset: 7, // why not working?
          },
          ticks: {
            fontSize: 8,
            padding: 10,
            beginAtZero: true,
          },
        },
      ],
    },
  },
};

export default allStates;
