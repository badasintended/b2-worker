import { factory } from '../app'
import { downloadFile } from '../lib/b2'
import { memory } from '../memory'
import { downloadAuth } from '../middleware/auth'
import { b2Auth } from '../middleware/b2auth'
import { fileCache } from '../middleware/cache'
import { mime } from '../middleware/mime'

export const file = factory.createHandlers(
  downloadAuth,
  b2Auth,
  fileCache,
  mime,

  async (c) => {
    const path = encodeURIComponent(decodeURIComponent(c.req.path.substring(1)))
    const download = await downloadFile(memory.auth!, path)
    return c.newResponse(download.body, download.status)
  },
)
