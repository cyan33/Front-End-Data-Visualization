import $ from 'jquery'

import '../stylesheet/style.less'

// import { generateLiquidfill, generatePm25Chart } from './generateChart'
import setUpTabsHandlers from './tabs'

$(() => {
  window.$ = $
  setUpTabsHandlers()
  // $.get('/pm25', (json) => {
  //   $('.loading-spinner').hide()
  //   generatePm25Chart(json)
  // })
})
