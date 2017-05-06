import $ from 'jquery'

import '../stylesheet/style.scss'

import {
  generateLiquidfill,
  generatePm25Chart,
} from './generateChart'
import setUpTabsHandlers from './tabs'

$(() => {
  // DEBUG
  window.$ = $
  setUpTabsHandlers()
})
