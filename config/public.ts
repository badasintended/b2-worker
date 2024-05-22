import type { PublicConfig } from '../src/config'
import styleCss from '../static/style.css'

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
   * Will be appended to the <head> tag.
   * Can also be a reference to a static css file using the <link> tag, if you prefer.
   */
  style: `<style>${styleCss}</style>`,
} satisfies PublicConfig
