import type { PublicConfig } from '../src/config'

export default {
  /**
   * The site name.
   */
  siteName: 'B2',

  /**
   * Whether to enable the uploader.
   * @default true
   */
  uploader: true,

  /**
   * When to refresh B2 API Authorization key, in seconds.
   * https://www.backblaze.com/apidocs/b2-authorize-account
   * @default 12 hours
   */
  apiRefreshTime: 12 * 60 * 60,

  /**
   * Directory response cache, in seconds.
   * @default 1 minute
   */
  directoryCache: 1 * 60,

  /**
   * File download cache, in seconds.
   * @default 1 week
   */
  fileCache: 7 * 24 * 60 * 60,

  /**
   * Extra mime types to be matched besides Hono's base mimes.
   * https://github.com/honojs/hono/blob/main/src/utils/mime.ts
   */
  extraMimes: {
    pom: 'application/xml',
    jar: 'application/java-archive',
  },
} satisfies PublicConfig
