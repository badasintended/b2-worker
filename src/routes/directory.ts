import { html } from 'hono/html'
import { factory } from '../app'
import { config } from '../config'
import { listFileNames } from '../lib/b2'
import { memory } from '../memory'
import { b2Auth } from '../middleware/b2auth'
import { directoryCache } from '../middleware/cache'
import { template } from '../template'
import { downloadAuth } from '../middleware/auth'

const collator = new Intl.Collator('en', {
  numeric: true,
  caseFirst: 'upper',
  sensitivity: 'base',
})

export const directory = factory.createHandlers(
  downloadAuth,
  b2Auth,
  directoryCache,

  async (c) => {
    const directory = c.req.path.substring(1)
    const response = await listFileNames(memory.auth!, {
      prefix: directory,
      delimiter: '/',
      maxFileCount: 10000,
    })

    const list = await response.json()

    // return c.json(files)

    let empty = false
    if (list.files.length === 0) {
      empty = true
      if (directory !== '') {
        c.status(404)
        return c.text('Not found')
      }
    }

    const files = list.files
      .filter(it => (it.action === 'folder' || it.action === 'upload') && !it.fileName.endsWith('.bzEmpty'))
      .map(it => ({ ...it, fileName: it.fileName.slice(directory.length) }))
      .sort((a, b) => a.action === b.action
        ? collator.compare(a.fileName, b.fileName)
        : a.action === 'folder' ? -1 : 1)

    const uploader = config.uploader
      ? html`
          <div class="grow"></div>
          <a href="/uploader?d=/${directory}">Upload</a>
        `
      : html``

    return c.html(template(
      c.req.path,

      html`
        <a href="/">${config.siteName}</a>
        ${directory.split('/').map((it, i, a) => html`
          / <a href="${'../'.repeat(Math.max(0, a.length - i - 2))}">${it}</a>
        `)}

        ${uploader}
      `,

      empty
        ? html`<div>Directory Empty</div>`
        : html`
            <table class="listing">
              <thead>
                <tr class="entry">
                  <th class="pad"></th>
                  <th class="name">Name</th>
                  <th class="size">Size</th>
                  <th class="date">Modified</th>
                  <th class="pad"></th>
                </tr>
              </thead>
              <tbody>
                ${directory === '' ? '' : listing('..', '\u2014 Go up', false, 0, 0)}
                ${files.map(it =>
                  listing(`${it.fileName}`, it.fileName, it.action === 'upload', it.contentLength, it.uploadTimestamp),
                )}
              </tbody>
            </table>
          `,
    ))
  },
)

const decimals = [
  /* K */ 1_000,
  /* M */ 1_000_000,
  /* G */ 1_000_000_000,
  /* T */ 1_000_000_000_000,
  /* P */ 1_000_000_000_000_000,
  /* E */ 1_000_000_000_000_000_000,
]

function humanSize(value: number): string {
  if (value < 1000) {
    return `${value} B`
  }

  let exponent = -1
  let divisor = 0

  for (const decimal of decimals) {
    if (value < decimal) {
      break
    }
    exponent++
    divisor = decimal
  }

  let truncated = value / divisor
  if (truncated >= 100) {
    truncated = Math.round(truncated)
  } else if (truncated >= 10) {
    truncated = Math.round(truncated * 10) / 10
  }

  return `${truncated.toFixed()} ${'KMGTPE'.charAt(exponent)}B`
}

function listing(path: string, name: string, isFile: boolean, size: number, timestamp: number) {
  let dateStr: string
  let sizeStr: string
  if (isFile) {
    dateStr = new Date(timestamp).toISOString().replace('T', ' ').split('.')[0]
    sizeStr = humanSize(size)
  } else {
    dateStr = '\u2014'
    sizeStr = '\u2014'
  }

  return html`
    <tr class="entry">
      <td class="pad"></td>
      <td class="name"><a href="${path}">${name}</a></td>
      <td class="size">${sizeStr}</td>
      <td class="date">${dateStr}</td>
      <td class="pad"></td>
    </tr>
  `
}
