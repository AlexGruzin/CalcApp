export const DURATION_OPTIONS = [
  {
    label: 'forecast:durationOptions.next12Month',
    value: 12,
  },
  {
    label: 'forecast:durationOptions.next6Month',
    value: 6,
  },
  {
    label: 'forecast:durationOptions.next3Month',
    value: 3,
  },
];

export const DOWNLOAD_OPTIONS = [
  {
    label: 'forecast:downloadOptions.downloadFor',
    value: 0,
  },
];

export const MODEL_TYPES_NAMES = {
  AGGRESSIVE: 'AGGRESSIVE',
  MODERATE: 'MODERATE',
  CONSERVATIVE: 'CONSERVATIVE',
};

export const MODEL_TYPES = [
  {
    label: 'forecast:growth.aggressive',
    text: 'forecast:growth.topModelText',
    value: MODEL_TYPES_NAMES.AGGRESSIVE,
  },
  {
    label: 'forecast:growth.moderate',
    text: 'forecast:growth.middleModelText',
    value: MODEL_TYPES_NAMES.MODERATE,
  },
  {
    label: 'forecast:growth.conservative',
    text: 'forecast:growth.bottomModelText',
    value: MODEL_TYPES_NAMES.CONSERVATIVE,
  },
];

export const forecastChartOptions = {
  data: {
    datasets: [
      {
        fill: false,
        lineTension: 0,
        backgroundColor: 'transparent',
        borderColor: 'rgba(207, 39, 185, 1)',
        borderCapStyle: 'square',
        borderDash: [10, 10],
        borderDashOffset: 50, // lineDashOffset
        borderJoinStyle: 'bevel',
        borderWidth: 2,
        spanGaps: false,
        pointRadius: 0,
        steppedLine: false,
        data: [0, 120, 160, 200, 220, 230, 450, 480, 510, 520, 550, 600],
      },
    ],
    xLabels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      // padding: 90,
    },
    legend: {
      display: false,
    },
    scales: {
      yAxes: [
        {
          gridLines: {
            color: 'rgba(0, 0, 0, 0)',
            drawTicks: false,
            borderDashOffset: 7,
          },
          ticks: {
            callback(value) {
              if (!value) return '';
              return `${value}k`;
            },
            maxTicksLimit: 7, // why not working?
            beginAtZero: true,
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
            padding: 10,
          },
        },
      ],
    },
  },
};
