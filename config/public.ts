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

} satisfies PublicConfig
