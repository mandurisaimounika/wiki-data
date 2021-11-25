const cheerio = require('cheerio')
const axios = require('axios')

const fetchCarBodyClass = (url) => {
  return axios.get(`${url}`)
    .then((response) => {
      const html = response.data
      const $ = cheerio.load(html)
      let carClass = $(".infobox tr td.infobox-data a[title$='car']:first").text()

      carClass = carClass || $('.infobox tr td.infobox-data a.mw-redirect:first').text()
      return carClass
    })
    .catch(function (error) {
      const {
        status
      } = JSON.stringify(error)

      if (status === 404) {
        return ''
      }
    })
}

module.exports = fetchCarBodyClass
