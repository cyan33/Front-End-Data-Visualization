/* eslint "no-underscore-dangle": 0 */
const path = require('path')
const express = require('express')

const airPollution = require('./data/airPollution')
const { SERVER } = require('../../config')

const app = express()

app.use('/dist', express.static('dist'))

app.set('views', path.resolve(__dirname, '../../', './src/client/template'))
app.set('view engine', 'jade')

app.get('/', (req, res) => {
  res.render('index', {
    text: 'Hello World',
  })
})

app.get('/demo/air-pollution', (req, res) => {
  res.render('air-pollution', {})
})

// demo links routes
app.get('/demo/unemployment-rate', (req, res) => {
  res.render('unemployment-rate', {})
})

app.listen(SERVER.PORT, () => {
  console.log('server start')
})

process.on('uncaughtException', (err) => {
  console.log('err', err)
})
