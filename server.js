const express = require('express')
const app = express()
const path = require('path')
const open = require('open')
const airPollution = require('./src/data/airPollution')
app.use('/dist', express.static('dist'))

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, './index.html'))
})

// app.get('/dist/:file', function(req, res) {
//   res.sendFile(path.resolve(__dirname, `./dist/${req.params.file}`))
// })

app.get('/pm25', (req, res) => {
  airPollution.get().then(re => {
    res.json(re)
  }).catch(err => err)
})

app.listen(6789, () => {
  console.log('server start')
  open('http://localhost:6789')
})

process.on('uncaughtException', (err) => {
  console.log('err', err)
})
