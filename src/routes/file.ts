import { factory } from '../app'
import { downloadFile } from '../lib/b2'
import { memory } from '../memory'
import { b2Auth } from '../middleware/b2auth'
import { fileCache } from '../middleware/cache'
import { mime } from '../middleware/mime'

export const file = factory.createHandlers(
  b2Auth,
  fileCache,
  mime,

  async (c) => {
    const download = await downloadFile(memory.auth!, c.req.path.substring(1))
    return c.newResponse(download.body, download.status)
  },
)
