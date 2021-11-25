const express = require('express')
const axios = require('axios')
const extractModels = require('../extract-models.js')

const router = express.Router()

router.get('/getCarModels', async (req, res, next) => {
  try {
    const response = await axios.get('https://en.wikipedia.org/wiki/List_of_automobile_sales_by_model')
    const html = await response.data
    const models = await extractModels(html)
    res
      .status(200)
      .json({
        models
      })
  } catch (e) {
    next(e)
  }
})

module.exports = router
