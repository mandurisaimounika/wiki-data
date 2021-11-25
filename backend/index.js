const express = require('express')

const getCarInfo = require('./routes/get-car-info.js')

const app = express()

app.use('/', getCarInfo)

app.listen(8080, console.log('App Listening to port 8080'))

module.exports = app
