import { ADVERT, SOCIAL } from 'constants/advertisment';

const CAMPAIGNS_TYPES = {
  ECONOMY: 'ECONOMY',
  TEMP: 'TEMP',
};

export const CHART_HEIGHT = 300;

export const TYPES_ICONS = {
  [CAMPAIGNS_TYPES.ECONOMY]: 'leaf.svg',
  [CAMPAIGNS_TYPES.TEMP]: 'clock.svg',
};

export const CAMPAIGNS = [
  {
    label: 'Brand Loyalty',
    description: 'This campaign make sure that shoppers know about your brand',
    status: 1,
    type: CAMPAIGNS_TYPES.ECONOMY,
    icons: [ADVERT.INSTAGRAM, ADVERT.FACEBOOK, SOCIAL.BITMAP, SOCIAL.ENVELOPE],
  },
  {
    label: 'Category Awareness',
    description: 'This campaign focuses on making sure that shoppers who search for your categories sees your brand',
    status: 2,
    type: CAMPAIGNS_TYPES.ECONOMY,
    icons: [ADVERT.INSTAGRAM, ADVERT.FACEBOOK, SOCIAL.BITMAP, SOCIAL.ENVELOPE],
  },
  {
    label: 'Smart Shopping',
    description: 'Targets shoppers looking for your products on Google Shop',
    status: 2,
    type: CAMPAIGNS_TYPES.TEMP,
    icons: [ADVERT.INSTAGRAM, SOCIAL.BITMAP, SOCIAL.ENVELOPE],
  },
  {
    label: 'Re-Targeting',
    description: 'Remind visitors of your products and services after they leave your website without buying',
    status: 1,
    icons: [ADVERT.INSTAGRAM, ADVERT.FACEBOOK, SOCIAL.BITMAP],
  },
  {
    label: 'Competitor',
    description: 'Encourage visitors to come back to your website if we haven’t seen them in a while',
    status: 1,
    icons: [ADVERT.FACEBOOK, SOCIAL.BITMAP, SOCIAL.ENVELOPE],
  },
  {
    label: 'Re-Engagement',
    description: 'Encourage visitors to come back to your website if we haven’t seen them in a while',
    status: 3,
    type: CAMPAIGNS_TYPES.TEMP,
    icons: [ADVERT.FACEBOOK, SOCIAL.BITMAP, SOCIAL.ENVELOPE],
  },
  {
    label: 'Prospecting',
    description: 'Expand your reach to potential customers who will likely engage in your brand',
    status: 3,
    icons: [ADVERT.INSTAGRAM, ADVERT.FACEBOOK, SOCIAL.ENVELOPE],
  },
];

export const campaignsList = [
  {
    name: '1',
    label: 'Brand Loyalty',
    type: 'Evergreen',
    part: ['Awareness', 'Consideration'],
    status: 'active',
    spend: '$XXX.XX',
    roas: '$XXX.XX',
  },
  {
    name: '1',
    label: 'Category Awareness',
    type: 'Evergreen',
    part: ['Awareness', 'Consideration'],
    status: 'inactive',
    spend: '$XXX.XX',
    roas: '$XXX.XX',
  },
  {
    name: '1',
    label: 'Smart Shopping',
    type: 'Evergreen',
    part: ['Awareness', 'Consideration'],
    status: 'inactive',
    spend: '$XXX.XX',
    roas: '$XXX.XX',
  },
  {
    name: '1',
    label: 'Competition',
    type: 'Evergreen',
    part: ['Awareness', 'Consideration'],
    status: 'inactive',
    spend: '$XXX.XX',
    roas: '$XXX.XX',
  },
];

export const CAMPAIGN_TYPE = [
  {
    label: 'campaigns:campaignType.all',
    value: 0,
  },
  {
    label: 'campaigns:campaignType.evergreen',
    value: 1,
  },
  {
    label: 'campaigns:campaignType.holiday',
    value: 2,
  },
  {
    label: 'campaigns:campaignType.custom',
    value: 3,
  },
];

export const FUNNEL = [
  {
    label: 'campaigns:funnel.all',
    value: 0,
  },
  {
    label: 'campaigns:funnel.awareness',
    value: 1,
  },
  {
    label: 'campaigns:funnel.consideration',
    value: 2,
  },
  {
    label: 'campaigns:funnel.conversion',
    value: 3,
  },
];

export const STATUS = [
  {
    label: 'campaigns:status.all',
    value: 0,
  },
  {
    label: 'campaigns:status.active',
    value: 1,
  },
  {
    label: 'campaigns:status.inactive',
    value: 2,
  },
  {
    label: 'campaigns:status.draft',
    value: 3,
  },
  {
    label: 'campaigns:status.archived',
    value: 4,
  },
];

export const ORDER_BY = [
  {
    label: 'campaigns:orderBy.az',
    value: 0,
  },
  {
    label: 'campaigns:orderBy.za',
    value: 1,
  },
  {
    label: 'campaigns:orderBy.newestFirst',
    value: 2,
  },
  {
    label: 'campaigns:orderBy.longestRunningFirst',
    value: 3,
  },
  {
    label: 'campaigns:orderBy.mostProfitableFirst',
    value: 4,
  },
  {
    label: 'campaigns:orderBy.leastProfitableFirst',
    value: 5,
  },
];

export const NEXT_MONTH_ITEMS = [
  {
    title: 'Early Launch Black Friday Door Busters',
    subtitle: 'Needs images, headlines, and landing pages',
  },
  {
    title: 'The Great Reveal',
    subtitle: 'Needs videos and landing page',
  },
  {
    title: '25% OFF NEW & SALE SPEND PLUS $150 OR MORE 2) 25% OFF NEW & SALE SPEND PLUS $150 OR MORE 2)',
    subtitle: 'Needs images, headlines, and landing pages',
  },
  {
    title: 'VIP BLACK FRIDAY',
    subtitle: 'Needs images, headlines, and landing pages',
  },
  {
    title: 'Black Friday Sale',
    subtitle: 'Needs images, headlines, and landing pages',
  },
  {
    title: 'Cyber Monday Sale',
    subtitle: 'Needs videos and landing page',
  },
  {
    title: '30% off site wide no exclusions',
    subtitle: 'Needs images, headlines, and landing pages',
  },
  {
    title: 'GWP Eyewear',
    subtitle: 'Needs images, headlines, and landing pages',
  },
];

export const campaignsChartOptions = {
  data: {
    datasets: [
      {
        backgroundColor: '#7349BE',
        barThickness: 30, // weight line in px
        data: [10, 10, 10, 700, 10, 100, 470, 20],
        label: 1,
      },
      {
        backgroundColor: 'rgba(207, 39, 185, 1)',
        barThickness: 30, // weight line in px
        data: [200, 20, 20, 600, 40, 180, 900, 100],
        label: 2,
      },
    ],
    xLabels: [
      '10-Brand',
      '11-Brand-Category',
      '14-Brand-Coupon',
      '16-Brand-International',
      '17-Brand-Broad',
      '25-DSA',
      '55-Showcase-Shopping-Brand',
      '58-Smart-Shopping',
    ],
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
              return `$${value}`;
            },
            fontSize: 8,
            padding: 10,
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
