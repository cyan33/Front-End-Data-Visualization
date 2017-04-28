const path = require('path')
const express = require('express')
const open = require('open')

const airPollution = require('./data/airPollution')
const { server } = require('../../config')

const app = express()

app.use('/dist', express.static('dist'))

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, './index.html'))
})

app.get('/pm25', (req, res) => {
  airPollution.get().then((re) => {
    res.json(re)
  }).catch(err => err)
})

app.listen(server.port, () => {
  console.log('server start')
  open(`http://localhost:${server.port}`)
})

process.on('uncaughtException', (err) => {
  console.log('err', err)
})
