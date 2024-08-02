import robotsTxt from '../../static/robots.txt'
import styleCss from '../../static/style.css'
import clientJs from '../../static/client.raw.js'
import { factory } from '../app'
import { fileCache } from '../middleware/cache'
import { mime } from '../middleware/mime'

function handlers(text: string) {
  return factory.createHandlers(fileCache, mime, c => c.text(text))
}

export const staticRoutes = factory.createApp()
  .get('/robots.txt', ...handlers(robotsTxt))
  .get('/style.css', ...handlers(styleCss))
  .get('/client.js', ...handlers(clientJs))
  .get('/favicon.ico', ...handlers(''))
