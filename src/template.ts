import { html } from 'hono/html'

export type Html = ReturnType<typeof html>

export function template(title: string, h1: Html, main: Html) {
  return html`
    <!DOCTYPE html>
    <html>
      <head>
        <title>${title}</title>
        <link rel="stylesheet" type="text/css" href="/style.css">
      </head>
      <body>
        <header>
          <h1>${h1}</h1>
        </header>
        <main>${main}</main>
        <footer>
          Powered by <a href="//git.bai.lol/b2-worker">b2-worker</a>
        </footer>
      </body>
    </html>
  `
}
