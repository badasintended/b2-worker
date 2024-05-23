import { factory } from '../app'
import { auth } from '../middleware/auth'
import { b2Auth } from '../middleware/b2auth'
import { getUploadUrl, uploadFile } from '../lib/b2'
import { cfCache, memory } from '../memory'

export const upload = factory.createHandlers(
  auth,
  b2Auth,

  async (c) => {
    const path = c.req.path.substring(1)

    const contentLengthHeader = c.req.header('Content-Length')
    if (contentLengthHeader === undefined) {
      return c.text('Missing "Content-Length" header', 400)
    }

    const contentLength = Number.parseInt(contentLengthHeader, 10)
    if (Number.isNaN(contentLength)) {
      return c.text('"Content-Length" headerr is not a number', 400)
    }

    const uploadUrlResponse = await getUploadUrl(memory.auth!)
    const uploadUrl = await uploadUrlResponse.json()

    const response = await uploadFile(uploadUrl, path, contentLength, c.req.raw.body!)

    if (response.ok) {
      await cfCache.delete(c.req.url)
    }

    return response
  },
)
