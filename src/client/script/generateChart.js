import 'echarts-liquidfill'
import echarts from 'echarts'
import $ from 'jquery'

import './echarts/china'

import { URL } from '../../../config/index'

const myChart = echarts.init(document.querySelector('.chart-container'))

export function generateLiquidfill(percentage = 0) {
  if (!$('.chart-container').is(':visible')) {
    $('.chart-container').show()
  }

  const shouldStop = percentage > 1
  const option = {
    series: [{
      type: 'liquidFill',
      data: [percentage, percentage - 0.1, percentage - 0.2],
    }],
  }
  if (!shouldStop) {
    myChart.setOption(option)
    setTimeout(() => generateLiquidfill(percentage + 0.1), 700)
  }
}

export function generatePm25Chart(data) {
  myChart.setOption({
    backgroundColor: '#404a59',
    title: {
      text: '全国主要城市空气质量',
      subtext: 'Data from pm25.in, author: Chang Yan',
      sublink: 'http://www.pm25.in',
      left: 'center',
      textStyle: {
        color: '#fff',
      },
    },
    tooltip: {
      trigger: 'item',
    },
    legend: {
      orient: 'vertical',
      y: 'bottom',
      x: 'right',
      data: ['pm2.5'],
      textStyle: {
        color: '#fff',
      },
    },
    geo: {
      map: 'china',
      label: {
        emphasis: {
          show: false,
        },
      },
      roam: true,
      itemStyle: {
        normal: {
          areaColor: '#323c48',
          borderColor: '#111',
        },
        emphasis: {
          areaColor: '#2a333d',
        },
      },
    },
    series: [
      {
        name: 'pm2.5',
        type: 'scatter',
        coordinateSystem: 'geo',
        data,
        symbolSize(val) {
          return val[2] / 10;
        },
        label: {
          normal: {
            formatter: '{b}',
            position: 'right',
            show: false,
          },
          emphasis: {
            show: true,
          },
        },
        itemStyle: {
          normal: {
            color: '#ddb926',
          },
        },
      },
      {
        name: 'Top 5',
        type: 'effectScatter',
        coordinateSystem: 'geo',
        data: data.sort((a, b) => b.value - a.value).slice(0, 6),
        symbolSize(val) {
          return val[2] / 10;
        },
        showEffectOn: 'render',
        rippleEffect: {
          brushType: 'stroke',
        },
        hoverAnimation: true,
        label: {
          normal: {
            formatter: '{b}',
            position: 'right',
            show: true,
          },
        },
        itemStyle: {
          normal: {
            color: '#f4e925',
            shadowBlur: 10,
            shadowColor: '#333',
          },
        },
        zlevel: 1,
      },
    ],
  })
}

export function generatePriceAndEarnings(rawData, data) {
  const schema = [
    'Cities',
    'Gross purchasing power',
    'Net purchasing power',
    'Prices (excl. rent)',
    'Prices (incl. rent)',
    'Gross wages',
    'Net wages',
    'Working time [hours per year]',
    'Vacation [paid working days per year]',
    'Time required for 1 Big Mac [minutes]',
    'Time required for 1 kg of bread [minutes]',
    'Time required for 1 kg of rice [minutes]',
    'Time required for 1 iPhone 4S, 16 GB [hours]',
    'City break',
    'Inflation 2006',
    'Inflation 2007',
    'Inflation 2008',
    'Inflation 2009',
    'Inflation 2010',
    'Inflation 2011',
    'Prices (incl. rent)',
    'Food basket',
    'Services',
    'Normal local rent medium [USD per month]',
    'Household appliances',
    'Bus or tram or underground',
    'Train',
    'Taxi  [USD per 5 km trip]',
    'Medium-sized cars price',
    'Medium-sized cars tax',
    'Medium-sized cars gas',
    'Restaurant [USD per dinner]',
    'Hotel *** [USD per night]',
    'Hotel ***** [USD per night]',
    "Women's medium clothing",
    "Men's medium clothing",
    'Furnished medium 4-room apartment [USD per month]',
    'Unfurnished medium 3-room apartment [USD per month]',
    'Net hourly wages [USD per hour]',
    'Gross hourly wages [USD per hour]',
    'Taxes and social security contributions',
    'Primary school teacher [USD per year]',
    'Bus driver [USD per year]',
    'Automobile mechanic [USD per year]',
    'Building labourer [USD per year]',
    'Skilled industrial worker [USD per year]',
    'Cook [USD per year]',
    'Departement head [USD per year]',
    'Product manager [USD per year]',
    'Engineer [USD per year]',
    'Bank credit clerk [USD per year]',
    'Secretary [USD per year]',
    'Saleswoman [USD per year]',
    'Female industrial worker [USD per year]',
    'Female call center worker [USD per year]',
    'Financial analyst [USD per year]',
    'Financial analyst [USD pro Jahr]',
  ]

  function generateParallelAxis() {
    const parallelAxis = [];
    for (let i = 1; i < schema.length; i++) {
      parallelAxis.push({ dim: i, name: schema[i] });
    }
    return parallelAxis;
  }

  myChart.setOption({
    backgroundColor: new echarts.graphic.RadialGradient(0.5, 0.5, 0.4, [{
      offset: 0,
      color: '#4b5769',
    }, {
      offset: 1,
      color: '#404a59',
    }]),
    title: {
      text: 'Prices and Earnings 2012',
      subtext: 'data from macrofocus',
      sublink: 'https://www.macrofocus.com/public/products/infoscope/datasets/pricesandearnings/',
      left: 'center',
      top: 5,
      itemGap: 0,
      textStyle: {
        color: '#eee',
      },
      z: 20,
    },
    tooltip: {
      trigger: 'item',
      formatter(params) {
        let value = (`${params.value}`).split('.');
        value = `${value[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,')}.${value[1]}`;
        return `${params.seriesName}<br/>${params.name} : ${value}`;
      },
    },
    toolbox: {
      show: true,
      left: 'right',
      iconStyle: {
        normal: {
          borderColor: '#ddd',
        },
      },
      feature: {
      },
      z: 20,
    },
    brush: {
      geoIndex: 0,
      brushLink: 'all',
      inBrush: {
        opacity: 1,
        symbolSize: 14,
      },
      outOfBrush: {
        color: '#000',
        opacity: 0.2,
      },
    },
    geo: {
      map: 'world',
      silent: true,
      label: {
        emphasis: {
          show: false,
          areaColor: '#eee',
        },
      },
      itemStyle: {
        normal: {
          borderWidth: 0.2,
          borderColor: '#404a59',
        },
      },
      left: '6%',
      top: 40,
      bottom: '54%',
      right: '14%',
      roam: true,
    },
    parallelAxis: generateParallelAxis(schema),
    grid: [{
      show: true,
      left: 0,
      right: 0,
      top: '48%',
      bottom: 0,
      borderColor: 'transparent',
      backgroundColor: '#404a59',
      z: 99,
    }, {
      show: true,
      left: 0,
      right: 0,
      top: 0,
      height: 28,
      borderColor: 'transparent',
      backgroundColor: '#404a59',
      z: 10,
    }],
    parallel: {
      top: '50%',
      left: 60,
      right: 20,
      bottom: 60,
      axisExpandable: true,
      axisExpandCenter: 15,
      axisExpandCount: 10,
      axisExpandWidth: 50,
      z: 100,
      parallelAxisDefault: {
        type: 'value',
        nameLocation: 'start',
        nameTextStyle: {
          fontSize: 12,
        },
        nameGap: 20,
        splitNumber: 3,
        tooltip: {
          show: true,
        },
        axisLine: {
          lineStyle: {
            width: 1,
            color: 'rgba(255,255,255,0.3)',
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        z: 100,
      },
    },
    series: [
      {
        name: 'Prices and Earnings 2012',
        type: 'scatter',
        coordinateSystem: 'geo',
        data,
        activeOpacity: 1,
        label: {
          normal: {
            formatter: '{b}',
            position: 'right',
            show: false,
          },
          emphasis: {
            show: true,
          },
        },
        symbolSize: 10,
        itemStyle: {
          normal: {
            borderColor: '#fff',
            color: '#577ceb',
          },
        },
      },
      {
        name: 'parallel',
        type: 'parallel',
        smooth: true,
        lineStyle: {
          normal: {
            color: '#577ceb',
            width: 0.5,
            opacity: 0.6,
          },
        },
        z: 100,
        blendMode: 'lighter',
        data: rawData,
      },
    ],
  })
}

export function generateWorldFlight() {
  $.getJSON(URL.WORLD_FLIGHT, (data) => {
    // airlineFields: ["name", "country"]
    // airlines: [["Eurowings", "Germany"], ["Eagle Air", "Uganda"],…]
    // airports: [["Goroka", "Goroka", "Papua New Guinea", 145.391881, -6.081689],…]
    // airportsFields:["name", "city", "country", "longitude", "latitude"]
    // routes:[[274, 2886, 2910], [274, 2887, 2883], [274, 2889, 2910], [274, 2889, 3969],…]
    function getAirportCoord(idx) {
      return [data.airports[idx][3], data.airports[idx][4]];  //  [145.391881, -6.081689]
    }
    const routes = data.routes.map(airline => [
      getAirportCoord(airline[1]),
      getAirportCoord(airline[2]),
    ]);

    myChart.setOption({
      title: {
        text: 'World Flights',
        left: 'center',
        textStyle: {
          color: '#eee',
        },
      },
      backgroundColor: '#003',
      tooltip: {
        formatter(param) {
          const route = data.routes[param.dataIndex];
          return `${data.airports[route[1]][1]} > ${data.airports[route[2]][1]}`;
        },
      },
      geo: {
        map: 'world',
        left: 0,
        right: 0,
        silent: true,
        itemStyle: {
          normal: {
            borderColor: '#003',
            color: '#005',
          },
        },
      },
      series: [{
        type: 'lines',
        coordinateSystem: 'geo',
        data: routes,
        large: true,
        largeThreshold: 100,
        lineStyle: {
          normal: {
            opacity: 0.05,
            width: 0.5,
            curveness: 0.3,
          },
        },
        blendMode: 'lighter',
      }],
    })
  })
}

export function generateBudgetProposal() {
  myChart.showLoading();

  const householdAmerica = 113616229;
  $.getJSON(URL.BUDGET_PROPOSAL, (obamaBudget) => {
    myChart.hideLoading();

    let formatUtil;

    function buildData(mode, originList) {
      const out = [];

      for (let i = 0; i < originList.length; i++) {
        const node = originList[i];
        const newNode = out[i] = cloneNodeInfo(node);
        const value = newNode.value;

        if (!newNode) {
          continue;
        }

            // Calculate amount per household.
        value[3] = value[0] / householdAmerica;

            // if mode === 0 and mode === 2 do nothing
        if (mode === 1) {
                // Set 'Change from 2010' to value[0].
          const tmp = value[1];
          value[1] = value[0];
          value[0] = tmp;
        }

        if (node.children) {
          newNode.children = buildData(mode, node.children);
        }
      }

      return out;
    }

    function cloneNodeInfo(node) {
      if (!node) {
        return;
      }

      const newNode = {};
      newNode.name = node.name;
      newNode.id = node.id;
      newNode.discretion = node.discretion;
      newNode.value = (node.value || []).slice();
      return newNode;
    }

    function getLevelOption(mode) {
      return [
        {
          color: mode === 2
                    ? [
                      '#c23531', '#314656', '#61a0a8', '#dd8668',
                      '#91c7ae', '#6e7074', '#61a0a8', '#bda29a',
                      '#44525d', '#c4ccd3',
                    ]
                    : null,
          colorMappingBy: 'id',
          itemStyle: {
            normal: {
              borderWidth: 3,
              gapWidth: 3,
            },
          },
        },
        {
          colorAlpha: mode === 2
                    ? [0.5, 1] : null,
          itemStyle: {
            normal: {
              gapWidth: 1,
            },
          },
        },
      ];
    }

    function isValidNumber(num) {
      return num != null && isFinite(num);
    }

    function getTooltipFormatter(mode) {
      const amountIndex = mode === 1 ? 1 : 0;
      const amountIndex2011 = mode === 1 ? 0 : 1;

      return function (info) {
        const value = info.value;

        let amount = value[amountIndex];
        amount = isValidNumber(amount)
                ? `${formatUtil.addCommas(amount * 1000)}$`
                : '-';

        let amount2011 = value[amountIndex2011];
        amount2011 = isValidNumber(amount2011)
                ? `${formatUtil.addCommas(amount2011 * 1000)}$`
                : '-';

        let perHousehold = value[3];
        perHousehold = isValidNumber(perHousehold)
                ? `${formatUtil.addCommas((+perHousehold.toFixed(4)) * 1000)}$`
                : '-';

        let change = value[2];
        change = isValidNumber(change)
                ? `${change.toFixed(2)}%`
                : '-';

        return [
          `<div class="tooltip-title">${formatUtil.encodeHTML(info.name)}</div>`,
          `2012 Amount: &nbsp;&nbsp;${amount}<br>`,
          `Per Household: &nbsp;&nbsp;${perHousehold}<br>`,
          `2011 Amount: &nbsp;&nbsp;${amount2011}<br>`,
          `Change From 2011: &nbsp;&nbsp;${change}`,
        ].join('');
      };
    }

    function createSeriesCommon() {
      return {
        type: 'treemap',
        label: {
          show: true,
          formatter: '{b}',
          normal: {
            textStyle: {
              ellipsis: true,
            },
          },
        },
        itemStyle: {
          normal: {
            borderColor: 'black',
          },
        },
        levels: getLevelOption(0),
      };
    }

    formatUtil = echarts.format;
    const modes = ['2012Budget', '2011Budget', 'Growth'];

    myChart.setOption({
      title: {
        left: 'center',
        text: 'How $3.7 Trillion is Spent',
        subtext: 'Obama’s 2012 Budget Proposal',
      },

      legend: {
        data: modes,
        selectedMode: 'single',
        top: 50,
        itemGap: 5,
      },

      tooltip: {
        formatter: getTooltipFormatter(0),
      },

      series: modes.map((mode, idx) => {
        const seriesOpt = createSeriesCommon();
        seriesOpt.name = mode;
        seriesOpt.top = 80;
        seriesOpt.visualDimension = idx === 2 ? 2 : null;
        seriesOpt.data = buildData(idx, obamaBudget);
        seriesOpt.levels = getLevelOption(idx);
        return seriesOpt;
      }),
    });
  });
}

// directly send dirty html file from backend
// export function generateUnemploymentRate() {

// }

export function generateDailyActivityProportion() {
  const cellSize = [80, 80];
  const pieRadius = 30;

  function getVirtulData() {
    const date = +echarts.number.parseDate('2017-02-01');
    const end = +echarts.number.parseDate('2017-03-01');
    const dayTime = 3600 * 24 * 1000;
    const data = [];
    for (let time = date; time < end; time += dayTime) {
      data.push([
        echarts.format.formatTime('yyyy-MM-dd', time),
        Math.floor(Math.random() * 10000),
      ]);
    }
    return data;
  }

  function getPieSeries(scatterData, chart) {
    return echarts.util.map(scatterData, (item, index) => {
      const center = chart.convertToPixel('calendar', item);
      return {
        id: `${index}pie`,
        type: 'pie',
        center,
        label: {
          normal: {
            formatter: '{c}',
            position: 'inside',
          },
        },
        radius: pieRadius,
        data: [
                { name: '工作', value: Math.round(Math.random() * 24) },
                { name: '娱乐', value: Math.round(Math.random() * 24) },
                { name: '睡觉', value: Math.round(Math.random() * 24) },
        ],
      };
    });
  }

  function getPieSeriesUpdate(scatterData, chart) {
    return echarts.util.map(scatterData, (item, index) => {
      const center = chart.convertToPixel('calendar', item);
      return {
        id: `${index}pie`,
        center,
      };
    });
  }

  const scatterData = getVirtulData();

  option = {
    tooltip: {},
    legend: {
      data: ['工作', '娱乐', '睡觉'],
      bottom: 20,
    },
    calendar: {
      top: 'middle',
      left: 'center',
      orient: 'vertical',
      cellSize,
      yearLabel: {
        show: false,
        textStyle: {
          fontSize: 30,
        },
      },
      dayLabel: {
        margin: 20,
        firstDay: 1,
        nameMap: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
      },
      monthLabel: {
        show: false,
      },
      range: ['2017-02'],
    },
    series: [{
      id: 'label',
      type: 'scatter',
      coordinateSystem: 'calendar',
      symbolSize: 1,
      label: {
        normal: {
          show: true,
          formatter(params) {
            return echarts.format.formatTime('dd', params.value[0]);
          },
          offset: [-cellSize[0] / 2 + 10, -cellSize[1] / 2 + 10],
          textStyle: {
            color: '#000',
            fontSize: 14,
          },
        },
      },
      data: scatterData,
    }],
  };

  if (!app.inNode) {
    let pieInitialized;
    setTimeout(() => {
      pieInitialized = true;
      myChart.setOption({
        series: getPieSeries(scatterData, myChart),
      });
    }, 10);

    app.onresize = function () {
      if (pieInitialized) {
        myChart.setOption({
          series: getPieSeriesUpdate(scatterData, myChart),
        });
      }
    };
  }
}
