const cheerio = require('cheerio')
const fetchCarBodyClass = require('./extract-car-body-class')

const BASE_URL = 'https://en.wikipedia.org'

const extractModels = async (html) => {
  const $ = cheerio.load(html)
  const modelArray = []

  await Promise.all($('.wikitable tr').map(async function () {
    const automobile = $(this).find('th a:first-child')
    const production = $(this).find('td:nth-child(3)').text()
    const image = $(this).find('td img')
    const modelName = automobile ? automobile.text() : null

    if (modelName) {
      const productionYear = production
        ? production.trim()
        : $(this).find('td:nth-child(4)').text().trim()

      const imageUrl = image && image.attr('src') ? 'https:' + image.attr('src') : 'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg'
      const modelUrl = automobile.attr('href')

      const modelUrlFull = modelUrl
        ? BASE_URL + modelUrl
        : null

      const carClass = await fetchCarBodyClass(modelUrlFull)

      modelArray.push({
        modelName,
        productionYear,
        imageUrl,
        carClass,
        modelUrlFull
      })
    }
  }))
  return modelArray
}

module.exports = extractModels
