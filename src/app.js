import $ from 'jquery'
import echarts from 'echarts'
import './style.less'

import { makeLiquidfill, makePm25Chart } from './generateChart'
import setUpTabsHandlers from './tabs'

$(() => {
  // for debug convenience
  window.$ = $
  // show the loading liquidfill
  const dataContainer = $('.chart-container')
  dataContainer.hide()

  setUpTabsHandlers()
  // $.get('/pm25', (json) => {
  //   $('.loading-spinner').hide()
  //   makePm25Chart(json)
  // })
})
