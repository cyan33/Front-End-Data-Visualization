// import 'echarts-liquidfill'
import echarts from 'echarts'
import * as d3 from 'd3';
import $ from 'jquery'

import './echarts/china'

import { URL } from '../../../config/index'

const myChart = echarts.init(document.querySelector('.chart-container'))

export function showLoading() {
  $('.preloader-wrapper').show()
}

export function hideLoading() {
  $('.preloader-wrapper').hide()
}

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

export function generatePm25Chart() {
  showLoading()

  function convertData(data, geoCoordMap) {
    const res = [];
    for (let i = 0; i < data.length; i++) {
      const geoCoord = geoCoordMap[data[i].name];
      if (geoCoord) {
        res.push({
          name: data[i].name,
          value: geoCoord.concat(data[i].value),
        });
      }
    }
    return res;
  }


  $.getJSON(URL.AIR_POLLUTION_FE, (json) => {
    hideLoading()
    const { data, geoCoordMap } = JSON.parse(json)
    const convertedData = [
      convertData(data, geoCoordMap),
      convertData(data.sort((a, b) => b.value - a.value).slice(0, 6), geoCoordMap),
    ];

    function renderBrushed(params) {
      const mainSeries = params.batch[0].selected[0];

      const selectedItems = [];
      const categoryData = [];
      const barData = [];
      const maxBar = 30;
      let sum = 0;
      let count = 0;

      for (var i = 0; i < mainSeries.dataIndex.length; i++) {
        const rawIndex = mainSeries.dataIndex[i];
        const dataItem = convertedData[0][rawIndex];
        const pmValue = dataItem.value[2];

        sum += pmValue;
        count++;

        selectedItems.push(dataItem);
      }

      selectedItems.sort((a, b) => a.value[2] - b.value[2]);

      for (var i = 0; i < Math.min(selectedItems.length, maxBar); i++) {
        categoryData.push(selectedItems[i].name);
        barData.push(selectedItems[i].value[2]);
      }

      this.setOption({
        yAxis: {
          data: categoryData,
        },
        xAxis: {
          axisLabel: { show: !!count },
        },
        title: {
          id: 'statistic',
          text: count ? `Average: ${(sum / count).toFixed(4)}` : '',
        },
        series: {
          id: 'bar',
          data: barData,
        },
      });
    }

    myChart.setOption({
      backgroundColor: '#404a59',
      animation: true,
      animationDuration: 1000,
      animationEasing: 'cubicInOut',
      animationDurationUpdate: 1000,
      animationEasingUpdate: 'cubicInOut',
      title: [
        {
          text: 'PM 2.5 of the Main Cities in China',
          subtext: 'data from PM25.in',
          sublink: 'http://www.pm25.in',
          left: 'center',
          textStyle: {
            color: '#fff',
          },
        },
        {
          id: 'statistic',
          right: 120,
          top: 40,
          width: 100,
          textStyle: {
            color: '#fff',
            fontSize: 16,
          },
        },
      ],
      toolbox: {
        iconStyle: {
          normal: {
            borderColor: '#fff',
          },
          emphasis: {
            borderColor: '#b1e4ff',
          },
        },
      },
      brush: {
        outOfBrush: {
          color: '#abc',
        },
        brushStyle: {
          borderWidth: 2,
          color: 'rgba(0,0,0,0.2)',
          borderColor: 'rgba(0,0,0,0.5)',
        },
        seriesIndex: [0, 1],
        throttleType: 'debounce',
        throttleDelay: 300,
        geoIndex: 0,
      },
      geo: {
        map: 'china',
        left: '10',
        right: '35%',
        center: [117.98561551896913, 31.205000490896193],
        zoom: 2.5,
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
      tooltip: {
        trigger: 'item',
      },
      grid: {
        right: 40,
        top: 100,
        bottom: 40,
        width: '30%',
      },
      xAxis: {
        type: 'value',
        scale: true,
        position: 'top',
        boundaryGap: false,
        splitLine: { show: false },
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: { margin: 2, textStyle: { color: '#aaa' } },
      },
      yAxis: {
        type: 'category',
        name: 'TOP 20',
        nameGap: 16,
        axisLine: { show: false, lineStyle: { color: '#ddd' } },
        axisTick: { show: false, lineStyle: { color: '#ddd' } },
        axisLabel: { interval: 0, textStyle: { color: '#ddd' } },
        data: [],
      },
      series: [
        {
          name: 'pm2.5',
          type: 'scatter',
          coordinateSystem: 'geo',
          data: convertedData[0],
          symbolSize(val) {
            return Math.max(val[2] / 10, 8);
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
          data: convertedData[1],
          symbolSize(val) {
            return Math.max(val[2] / 10, 8);
          },
          showEffectOn: 'emphasis',
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
        {
          id: 'bar',
          zlevel: 2,
          type: 'bar',
          symbol: 'none',
          itemStyle: {
            normal: {
              color: '#ddb926',
            },
          },
          data: [],
        },
      ],
    })


    myChart.on('brushselected', renderBrushed);

    setTimeout(() => {
      myChart.dispatchAction({
        type: 'brush',
        areas: [
          {
            geoIndex: 0,
            brushType: 'polygon',
            coordRange: [[119.72, 34.85], [119.68, 34.85], [119.5, 34.84], [119.19, 34.77], [118.76, 34.63], [118.6, 34.6], [118.46, 34.6], [118.33, 34.57], [118.05, 34.56], [117.6, 34.56], [117.41, 34.56], [117.25, 34.56], [117.11, 34.56], [117.02, 34.56], [117, 34.56], [116.94, 34.56], [116.94, 34.55], [116.9, 34.5], [116.88, 34.44], [116.88, 34.37], [116.88, 34.33], [116.88, 34.24], [116.92, 34.15], [116.98, 34.09], [117.05, 34.06], [117.19, 33.96], [117.29, 33.9], [117.43, 33.8], [117.49, 33.75], [117.54, 33.68], [117.6, 33.65], [117.62, 33.61], [117.64, 33.59], [117.68, 33.58], [117.7, 33.52], [117.74, 33.5], [117.74, 33.46], [117.8, 33.44], [117.82, 33.41], [117.86, 33.37], [117.9, 33.3], [117.9, 33.28], [117.9, 33.27], [118.09, 32.97], [118.21, 32.7], [118.29, 32.56], [118.31, 32.5], [118.35, 32.46], [118.35, 32.42], [118.35, 32.36], [118.35, 32.34], [118.37, 32.24], [118.37, 32.14], [118.37, 32.09], [118.44, 32.05], [118.46, 32.01], [118.54, 31.98], [118.6, 31.93], [118.68, 31.86], [118.72, 31.8], [118.74, 31.78], [118.76, 31.74], [118.78, 31.7], [118.82, 31.64], [118.82, 31.62], [118.86, 31.58], [118.86, 31.55], [118.88, 31.54], [118.88, 31.52], [118.9, 31.51], [118.91, 31.48], [118.93, 31.43], [118.95, 31.4], [118.97, 31.39], [118.97, 31.37], [118.97, 31.34], [118.97, 31.27], [118.97, 31.21], [118.97, 31.17], [118.97, 31.12], [118.97, 31.02], [118.97, 30.93], [118.97, 30.87], [118.97, 30.85], [118.95, 30.8], [118.95, 30.77], [118.95, 30.76], [118.93, 30.7], [118.91, 30.63], [118.91, 30.61], [118.91, 30.6], [118.9, 30.6], [118.88, 30.54], [118.88, 30.51], [118.86, 30.51], [118.86, 30.46], [118.72, 30.18], [118.68, 30.1], [118.66, 30.07], [118.62, 29.91], [118.56, 29.73], [118.52, 29.63], [118.48, 29.51], [118.44, 29.42], [118.44, 29.32], [118.43, 29.19], [118.43, 29.14], [118.43, 29.08], [118.44, 29.05], [118.46, 29.05], [118.6, 28.95], [118.64, 28.94], [119.07, 28.51], [119.25, 28.41], [119.36, 28.28], [119.46, 28.19], [119.54, 28.13], [119.66, 28.03], [119.78, 28], [119.87, 27.94], [120.03, 27.86], [120.17, 27.79], [120.23, 27.76], [120.3, 27.72], [120.42, 27.66], [120.52, 27.64], [120.58, 27.63], [120.64, 27.63], [120.77, 27.63], [120.89, 27.61], [120.97, 27.6], [121.07, 27.59], [121.15, 27.59], [121.28, 27.59], [121.38, 27.61], [121.56, 27.73], [121.73, 27.89], [122.03, 28.2], [122.3, 28.5], [122.46, 28.72], [122.5, 28.77], [122.54, 28.82], [122.56, 28.82], [122.58, 28.85], [122.6, 28.86], [122.61, 28.91], [122.71, 29.02], [122.73, 29.08], [122.93, 29.44], [122.99, 29.54], [123.03, 29.66], [123.05, 29.73], [123.16, 29.92], [123.24, 30.02], [123.28, 30.13], [123.32, 30.29], [123.36, 30.36], [123.36, 30.55], [123.36, 30.74], [123.36, 31.05], [123.36, 31.14], [123.36, 31.26], [123.38, 31.42], [123.46, 31.74], [123.48, 31.83], [123.48, 31.95], [123.46, 32.09], [123.34, 32.25], [123.22, 32.39], [123.12, 32.46], [123.07, 32.48], [123.05, 32.49], [122.97, 32.53], [122.91, 32.59], [122.83, 32.81], [122.77, 32.87], [122.71, 32.9], [122.56, 32.97], [122.38, 33.05], [122.3, 33.12], [122.26, 33.15], [122.22, 33.21], [122.22, 33.3], [122.22, 33.39], [122.18, 33.44], [122.07, 33.56], [121.99, 33.69], [121.89, 33.78], [121.69, 34.02], [121.66, 34.05], [121.64, 34.08]],
          },
        ],
      });
    }, 0);
  })
}

export function generatePriceAndEarnings(json) {
  function makeMapData(rawData, geoCoordMap) {
    const mapData = [];
    for (let i = 0; i < rawData.length; i++) {
      const geoCoord = geoCoordMap[rawData[i][0]];
      if (geoCoord) {
        mapData.push({
          name: rawData[i][0],
          value: geoCoord.concat(rawData[i].slice(1)),
        });
      }
    }
    return mapData;
  }

  function makeParallelAxis(schema) {
    const parallelAxis = [];
    for (let i = 1; i < schema.length; i++) {
      parallelAxis.push({ dim: i, name: schema[i] });
    }
    return parallelAxis;
  }
  showLoading()

  $.getJSON(URL.PRICE_AND_EARNINGS, (json) => {
    hideLoading()

    const { rawData, geoCoordMap, schema } = JSON.parse(json)

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
        // itemStyle: {
        //     normal: {
        //         areaColor: '#323c48',
        //         borderColor: '#111'
        //     },
        //     emphasis: {
        //         areaColor: '#2a333d'
        //     }
        // }
      },
      parallelAxis: makeParallelAxis(schema),
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
            // nameRotate: 45,
            // nameLocation: 'end',
          nameTextStyle: {
            fontSize: 12,
          },
          nameGap: 20,
          splitNumber: 3,
          tooltip: {
            show: true,
          },
          axisLine: {
                // show: false,
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
          symbolSize: 8,
          data: makeMapData(rawData, geoCoordMap),
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
            // symbolSize: function (data) {
            //     return Math.max(5, data[2] / 5);
            // },
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
  })
}

export function generateWorldFlight() {
  showLoading()

  $.getJSON(URL.WORLD_FLIGHT, (json) => {
    hideLoading()

    const data = JSON.parse(json)

    const airports = data.airports.map(item => ({
      coord: [item[3], item[4]],
    }));

    function getAirportCoord(idx) {
      return [data.airports[idx][3], data.airports[idx][4]];
    }

    // Route: [airlineIndex, sourceAirportIndex, destinationAirportIndex]
    const routesGroupByAirline = {};
    data.routes.forEach((route) => {
      const airline = data.airlines[route[0]];
      const airlineName = airline[0];
      if (!routesGroupByAirline[airlineName]) {
        routesGroupByAirline[airlineName] = [];
      }
      routesGroupByAirline[airlineName].push(route);
    });

    const pointsData = [];
    data.routes.forEach((airline) => {
      pointsData.push(getAirportCoord(airline[1]));
      pointsData.push(getAirportCoord(airline[2]));
    });

    const series = data.airlines.map((airline) => {
      const airlineName = airline[0];
      const routes = routesGroupByAirline[airlineName];

      if (!routes) {
        return null;
      }
      return {
        type: 'lines3D',
        name: airlineName,

        effect: {
          show: true,
          trailWidth: 2,
          trailLength: 0.2,
          trailOpacity: 0.4,
          trailColor: 'rgb(30, 30, 60)',
        },

        lineStyle: {
          width: 1,
          color: 'rgb(50, 50, 150)',
                // color: 'rgb(118, 233, 241)',
          opacity: 0.1,
        },
        blendMode: 'lighter',

        distanceToGlobe: 4,

        data: routes.map(item => [airports[item[1]].coord, airports[item[2]].coord]),
      };
    }).filter(series => !!series);
    series.push({
      type: 'scatter3D',
      coordinateSystem: 'globe',
      blendMode: 'lighter',
      symbolSize: 2,
      distanceToGlobe: 4,
      itemStyle: {
        color: 'rgb(50, 50, 150)',
        opacity: 0.2,
      },
      data: pointsData,
    });

    myChart.setOption({
      legend: {
        selectedMode: 'single',
        left: 'left',
        data: Object.keys(routesGroupByAirline),
        orient: 'vertical',
        textStyle: {
          color: '#fff',
        },
      },
      globe: {
        // static jpg from public folder
        environment: '/images/universe.jpg',

        heightTexture: '/images/globe_texture.jpg',

        displacementScale: 0.05,
        displacementQuality: 'high',

        baseColor: '#000',

        shading: 'realistic',
        realisticMaterial: {
          roughness: 0.2,
          metalness: 0,
        },

        postEffect: {
          enable: true,
          depthOfField: {
                    // enable: true
          },
        },
        temporalSuperSampling: {
          enable: true,
        },
        light: {
          ambient: {
            intensity: 0,
          },
          main: {
            intensity: 0.1,
            shadow: false,
          },
          ambientCubemap: {
            texture: '/images/globe_color.hdr',
            exposure: 1,
            diffuseIntensity: 0.5,
            specularIntensity: 2,
          },
        },
        viewControl: {
          autoRotate: false,
        },
      },
      series,
    });
    window.addEventListener('keydown', () => {
      series.forEach((series, idx) => {
        myChart.dispatchAction({
          type: 'lines3DToggleEffect',
          seriesIndex: idx,
        });
      })
    });
  })
}

export function generateBudgetProposal() {
  showLoading();

  const householdAmerica = 113616229;
  $.getJSON(URL.BUDGET_PROPOSAL, (obamaBudget) => {
    hideLoading();

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
        seriesOpt.data = buildData(idx, JSON.parse(obamaBudget));
        seriesOpt.levels = getLevelOption(idx);
        return seriesOpt;
      }),
    });
  })
}

// directly send dirty html file from backend
// export function generateUnemploymentRate() {

// }

export function generateDailyActivityProportion() {
  const cellSize = [80, 80];
  const pieRadius = 30;

  function getVirtualData() {
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

  const scatterData = getVirtualData();

  const option = {
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
