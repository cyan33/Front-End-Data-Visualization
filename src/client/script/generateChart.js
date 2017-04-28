import 'echarts-liquidfill'
import echarts from 'echarts'
import china from './china'
import $ from 'jquery'

// invalid dom right now, try container
// const liquidfill = echarts.init(document.querySelector('.liquidfill'))

export function makeLiquidfill(percentage = 0) {
  if(!$('.liquidfill').is(":visible")) {
    $('.liquidfill').show()
  }

  const shouldStop = percentage > 1
  const option = {
    series: [{
      type: 'liquidFill',
      data: [percentage, percentage - 0.1, percentage - 0.2],
    }],
  }
  if(!shouldStop) {
    liquidfill.setOption(option)
    setTimeout(() => makeLiquidfill(percentage + 0.1), 700)
  }
}

export function makePm25Chart(data) {
  const myChart = echarts.init(document.querySelector('.chart-container'))

  $('.chart-container').show()

  myChart.setOption({
    backgroundColor: '#404a59',
    title: {
      text: '全国主要城市空气质量',
      subtext: 'Data from pm25.in, author: Chang Yan',
      sublink: 'http://www.pm25.in',
      left: 'center',
      textStyle: {
          color: '#fff'
      }
    },
    tooltip : {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      y: 'bottom',
      x:'right',
      data:['pm2.5'],
      textStyle: {
          color: '#fff'
      }
    },
    geo: {
      map: 'china',
      label: {
        emphasis: {
          show: false
        }
      },
      roam: true,
      itemStyle: {
        normal: {
          areaColor: '#323c48',
          borderColor: '#111'
        },
        emphasis: {
          areaColor: '#2a333d'
        }
      }
    },
    series : [
      {
        name: 'pm2.5',
        type: 'scatter',
        coordinateSystem: 'geo',
        data: data,
        symbolSize: function (val) {
          return val[2] / 10;
        },
        label: {
          normal: {
            formatter: '{b}',
            position: 'right',
            show: false
          },
          emphasis: {
            show: true
          }
        },
        itemStyle: {
          normal: {
            color: '#ddb926'
          }
        }
      },
      {
        name: 'Top 5',
        type: 'effectScatter',
        coordinateSystem: 'geo',
        data: data.sort(function (a, b) {
          return b.value - a.value;
        }).slice(0, 6),
        symbolSize: function (val) {
          return val[2] / 10;
        },
        showEffectOn: 'render',
        rippleEffect: {
          brushType: 'stroke'
        },
        hoverAnimation: true,
        label: {
          normal: {
            formatter: '{b}',
            position: 'right',
            show: true
          }
        },
        itemStyle: {
          normal: {
            color: '#f4e925',
            shadowBlur: 10,
            shadowColor: '#333'
          }
        },
        zlevel: 1
      }
    ]
  });
}
