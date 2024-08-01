import { html } from 'hono/html'
import { factory } from '../app'
import { uploadAuth } from '../middleware/auth'
import { b2Auth } from '../middleware/b2auth'
import { getUploadUrl, uploadFile } from '../lib/b2'
import { cfCache, memory } from '../memory'
import { template } from '../template'

export const uploadPut = factory.createHandlers(
  uploadAuth,
  b2Auth,

  async (c) => {
    const path = c.req.path.substring(1)

    const contentLengthHeader = c.req.header('Content-Length')
    if (contentLengthHeader === undefined) return c.text('Missing "Content-Length" header', 400)

    const contentLength = Number.parseInt(contentLengthHeader, 10)
    if (Number.isNaN(contentLength)) return c.text('"Content-Length" headerr is not a number', 400)

    const response = await upload(path, contentLength, c.req.raw.body!)
    if (response.ok) await cfCache.delete(c.req.url)

    return response
  },
)

export const uploadPost = factory.createHandlers(
  uploadAuth,
  b2Auth,

  async (c) => {
    const body = await c.req.parseBody({ all: true })

    let { directory } = body
    if (typeof directory !== 'string') return c.text('Missing directory value')
    directory = directory.trim().replace(/^\/+|\/+$/g, '')

    let files = body.files
    if (typeof files === 'string') c.text('Missing files')
    if (!Array.isArray(files)) files = [files]
    if (files.length === 0 || typeof files[0] === 'string') c.text('Missing files')

    const url = new URL(c.req.url)

    for (const file of (files as File[])) {
      const path = directory === '' ? file.name : `${directory}/${file.name}`
      const response = await upload(path, file.size, file.stream())
      if (response.ok) await cfCache.delete(`${url.origin}/${path}`)
      else return response
    }

    cfCache.delete(`${url.origin}/${directory}`)
    return c.redirect(`/${directory}/`)
  },
)

export const uploader = factory.createHandlers(
  uploadAuth,
  // fileCache,
  async (c) => {
    const directory = c.req.query('d')

    return c.html(template(
      'Uploader',
      html`Uploader`,

      html`
        <div>
          <form action="/uploader" method="post" enctype="multipart/form-data">
            <label for="directory">Directory</label><br>
            <input type="text" name="directory" id="directory" value="${directory}">
            
            <br><br>

            <label for="files">Files</label><br>
            <input type="file" name="files" id="files" multiple>
            
            <br><br>

            <input type="submit" value="Upload">
          </form>
        </div>
      `,
    ))
  },
)

async function upload(path: string, size: number, stream: ReadableStream) {
  const uploadUrlResponse = await getUploadUrl(memory.auth!)
  const uploadUrl = await uploadUrlResponse.json()
  return uploadFile(uploadUrl, path, size, stream)
}
