/* eslint "no-underscore-dangle": 0 */
const path = require('path')
const express = require('express')

const airPollution = require('./data/airPollution')
const { server } = require('../../config')

const app = express()

app.use('/dist', express.static('dist'))

app.set('views', path.resolve(__dirname, '../../', './src/client/template'))
app.set('view engine', 'jade')

app.get('/', (req, res) => {
  res.render('index', {
    text: 'Hello World',
  })
})

app.get('/air-pollution', (req, res) => {
  airPollution.get().then((result) => {
    res.render('air-pollution', {
      result,
    })
  })
  .catch((err) => {
    console.error(err)
  })
})

app.listen(server.port, () => {
  console.log('server start')
})

process.on('uncaughtException', (err) => {
  console.log('err', err)
})
