const connectToMongo = require('../../lib/mongodb.connect')
const ShortUrl = require('../../lib/shortUrls.model')

connectToMongo()

const isValidHttpUrl = (string) => {
  try {
    new URL(string)
  } catch (error) {
    console.error(error)
    return false
  }
  return true
}

export default async function (req, res) {
  if (req.method === 'POST') {
    if (req.body.url.trim() === '') {
      return res.json({ error: 'Please enter the URL to shorten' })
    }
    if (isValidHttpUrl(req.body.url.trim())) {
      try {
        const shortURL = await ShortUrl.create({ full: req.body.url.trim() })
        if (shortURL) {
          return res.json({ short: shortURL.short })
        }
        return res.status(400).json({ error: 'Error occurred while creating your Short URL' })
      } catch (error) {
        console.error(error)
        return res.status(500).json({ error: 'Internal Server Error' })
      }
    }
    return res.status(400).json({ error: 'Please enter a valid URL' })
  }

  return res.status(400).send('Cannot GET')
}