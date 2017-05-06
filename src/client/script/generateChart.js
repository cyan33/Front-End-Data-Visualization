// import 'echarts-liquidfill'
import echarts from 'echarts'
import $ from 'jquery'

import './echarts/china'

import { URL } from '../../../config/index'

const myChart = echarts.init(document.querySelector('.chart-container'))

const geoCoordMap = {
  海门: [121.15, 31.89],
  鄂尔多斯: [109.781327, 39.608266],
  招远: [120.38, 37.35],
  舟山: [122.207216, 29.985295],
  齐齐哈尔: [123.97, 47.33],
  盐城: [120.13, 33.38],
  赤峰: [118.87, 42.28],
  青岛: [120.33, 36.07],
  乳山: [121.52, 36.89],
  金昌: [102.188043, 38.520089],
  泉州: [118.58, 24.93],
  莱西: [120.53, 36.86],
  日照: [119.46, 35.42],
  胶南: [119.97, 35.88],
  南通: [121.05, 32.08],
  拉萨: [91.11, 29.97],
  云浮: [112.02, 22.93],
  梅州: [116.1, 24.55],
  文登: [122.05, 37.2],
  上海: [121.48, 31.22],
  攀枝花: [101.718637, 26.582347],
  威海: [122.1, 37.5],
  承德: [117.93, 40.97],
  厦门: [118.1, 24.46],
  汕尾: [115.375279, 22.786211],
  潮州: [116.63, 23.68],
  丹东: [124.37, 40.13],
  太仓: [121.1, 31.45],
  曲靖: [103.79, 25.51],
  烟台: [121.39, 37.52],
  福州: [119.3, 26.08],
  瓦房店: [121.979603, 39.627114],
  即墨: [120.45, 36.38],
  抚顺: [123.97, 41.97],
  玉溪: [102.52, 24.35],
  张家口: [114.87, 40.82],
  阳泉: [113.57, 37.85],
  莱州: [119.942327, 37.177017],
  湖州: [120.1, 30.86],
  汕头: [116.69, 23.39],
  昆山: [120.95, 31.39],
  宁波: [121.56, 29.86],
  湛江: [110.359377, 21.270708],
  揭阳: [116.35, 23.55],
  荣成: [122.41, 37.16],
  连云港: [119.16, 34.59],
  葫芦岛: [120.836932, 40.711052],
  常熟: [120.74, 31.64],
  东莞: [113.75, 23.04],
  河源: [114.68, 23.73],
  淮安: [119.15, 33.5],
  泰州: [119.9, 32.49],
  南宁: [108.33, 22.84],
  营口: [122.18, 40.65],
  惠州: [114.4, 23.09],
  江阴: [120.26, 31.91],
  蓬莱: [120.75, 37.8],
  韶关: [113.62, 24.84],
  嘉峪关: [98.289152, 39.77313],
  广州: [113.23, 23.16],
  延安: [109.47, 36.6],
  太原: [112.53, 37.87],
  清远: [113.01, 23.7],
  中山: [113.38, 22.52],
  昆明: [102.73, 25.04],
  寿光: [118.73, 36.86],
  盘锦: [122.070714, 41.119997],
  长治: [113.08, 36.18],
  深圳: [114.07, 22.62],
  珠海: [113.52, 22.3],
  宿迁: [118.3, 33.96],
  咸阳: [108.72, 34.36],
  铜川: [109.11, 35.09],
  平度: [119.97, 36.77],
  佛山: [113.11, 23.05],
  海口: [110.35, 20.02],
  江门: [113.06, 22.61],
  章丘: [117.53, 36.72],
  肇庆: [112.44, 23.05],
  大连: [121.62, 38.92],
  临汾: [111.5, 36.08],
  吴江: [120.63, 31.16],
  石嘴山: [106.39, 39.04],
  沈阳: [123.38, 41.8],
  苏州: [120.62, 31.32],
  茂名: [110.88, 21.68],
  嘉兴: [120.76, 30.77],
  长春: [125.35, 43.88],
  胶州: [120.03336, 36.264622],
  银川: [106.27, 38.47],
  张家港: [120.555821, 31.875428],
  三门峡: [111.19, 34.76],
  锦州: [121.15, 41.13],
  南昌: [115.89, 28.68],
  柳州: [109.4, 24.33],
  三亚: [109.511909, 18.252847],
  自贡: [104.778442, 29.33903],
  吉林: [126.57, 43.87],
  阳江: [111.95, 21.85],
  泸州: [105.39, 28.91],
  西宁: [101.74, 36.56],
  宜宾: [104.56, 29.77],
  呼和浩特: [111.65, 40.82],
  成都: [104.06, 30.67],
  大同: [113.3, 40.12],
  镇江: [119.44, 32.2],
  桂林: [110.28, 25.29],
  张家界: [110.479191, 29.117096],
  宜兴: [119.82, 31.36],
  北海: [109.12, 21.49],
  西安: [108.95, 34.27],
  金坛: [119.56, 31.74],
  东营: [118.49, 37.46],
  牡丹江: [129.58, 44.6],
  遵义: [106.9, 27.7],
  绍兴: [120.58, 30.01],
  扬州: [119.42, 32.39],
  常州: [119.95, 31.79],
  潍坊: [119.1, 36.62],
  重庆: [106.54, 29.59],
  台州: [121.420757, 28.656386],
  南京: [118.78, 32.04],
  滨州: [118.03, 37.36],
  贵阳: [106.71, 26.57],
  无锡: [120.29, 31.59],
  本溪: [123.73, 41.3],
  克拉玛依: [84.77, 45.59],
  渭南: [109.5, 34.52],
  马鞍山: [118.48, 31.56],
  宝鸡: [107.15, 34.38],
  焦作: [113.21, 35.24],
  句容: [119.16, 31.95],
  北京: [116.46, 39.92],
  徐州: [117.2, 34.26],
  衡水: [115.72, 37.72],
  包头: [110, 40.58],
  绵阳: [104.73, 31.48],
  乌鲁木齐: [87.68, 43.77],
  枣庄: [117.57, 34.86],
  杭州: [120.19, 30.26],
  淄博: [118.05, 36.78],
  鞍山: [122.85, 41.12],
  溧阳: [119.48, 31.43],
  库尔勒: [86.06, 41.68],
  安阳: [114.35, 36.1],
  开封: [114.35, 34.79],
  济南: [117, 36.65],
  德阳: [104.37, 31.13],
  温州: [120.65, 28.01],
  九江: [115.97, 29.71],
  邯郸: [114.47, 36.6],
  临安: [119.72, 30.23],
  兰州: [103.73, 36.03],
  沧州: [116.83, 38.33],
  临沂: [118.35, 35.05],
  南充: [106.110698, 30.837793],
  天津: [117.2, 39.13],
  富阳: [119.95, 30.07],
  泰安: [117.13, 36.18],
  诸暨: [120.23, 29.71],
  郑州: [113.65, 34.76],
  哈尔滨: [126.63, 45.75],
  聊城: [115.97, 36.45],
  芜湖: [118.38, 31.33],
  唐山: [118.02, 39.63],
  平顶山: [113.29, 33.75],
  邢台: [114.48, 37.05],
  德州: [116.29, 37.45],
  济宁: [116.59, 35.38],
  荆州: [112.239741, 30.335165],
  宜昌: [111.3, 30.7],
  义乌: [120.06, 29.32],
  丽水: [119.92, 28.45],
  洛阳: [112.44, 34.7],
  秦皇岛: [119.57, 39.95],
  株洲: [113.16, 27.83],
  石家庄: [114.48, 38.03],
  莱芜: [117.67, 36.19],
  常德: [111.69, 29.05],
  保定: [115.48, 38.85],
  湘潭: [112.91, 27.87],
  金华: [119.64, 29.12],
  岳阳: [113.09, 29.37],
  长沙: [113, 28.21],
  衢州: [118.88, 28.97],
  廊坊: [116.7, 39.53],
  菏泽: [115.480656, 35.23375],
  合肥: [117.27, 31.86],
  武汉: [114.31, 30.52],
  大庆: [125.03, 46.58],
}

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

export function generatePm25Chart(data) {
  // in this case, when this function is called.
  // we already have the data we want,
  // so we call hideLoading instead of showLoading
  hideLoading()
  const convertData = function (data) {
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
  };

  const convertedData = [
    convertData(data),
    convertData(data.sort((a, b) => b.value - a.value).slice(0, 6)),
  ];

  myChart.setOption({
    backgroundColor: '#404a59',
    animation: true,
    animationDuration: 1000,
    animationEasing: 'cubicInOut',
    animationDurationUpdate: 1000,
    animationEasingUpdate: 'cubicInOut',
    title: [
      {
        text: '全国主要城市 PM 2.5',
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
        text: count ? `平均: ${(sum / count).toFixed(4)}` : '',
      },
      series: {
        id: 'bar',
        data: barData,
      },
    });
  }
}

export function generatePriceAndEarnings(rawData, data) {
  hideLoading()
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
  showLoading()
  $.getJSON(URL.WORLD_FLIGHT, (data) => {
    hideLoading()
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
