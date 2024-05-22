import { factory } from '../app'
import { downloadFile } from '../lib/b2'
import { memory } from '../memory'
import { fileCache } from '../middleware/cache'
import { mime } from '../middleware/mime'

export const file = factory.createHandlers(
  fileCache,
  mime,

  async (c) => {
    const download = await downloadFile(memory.auth!, c.req.path.substring(1))
    return c.newResponse(download.body, download.status)
  },
)
