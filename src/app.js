import $ from 'jquery'
import echarts from 'echarts'
import './style.less'

import makePm25Chart from './makePm25Chart'

$(() => {
  $.get('/pm25', (json) => {
    makePm25Chart(json)
  })
})
