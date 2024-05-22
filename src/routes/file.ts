import publicConfig from '../../config/public'
import { factory } from '../app'
import { downloadFile } from '../lib/b2'
import { memory } from '../memory'
import { cache } from '../middleware/cache'

export const file = factory.createHandlers(cache(publicConfig.fileCache), async (c) => {
  const download = await downloadFile(memory.auth!, c.req.path.substring(1))
  return c.newResponse(download.body, download.status)
})
