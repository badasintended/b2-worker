import type { Config } from '../src/config'
import guestRule from './rule/guest.rule'

export default {
  /**
   * Backblaze API keys.
   * Need to only have access to single bucket.
   */
  b2: {
    keyId: '',
    key: '',
  },

  /**
   * The site name.
   */
  siteName: 'B2',

  /**
   * Whether to enable directory listing.
   */
  listing: true,

  /**
   * Whether to enable the uploader.
   */
  uploader: true,

  /**
   * Mapping of username and password for uploading.
   */
  accounts: [],

  /**
   * List of username and paths that the username can download and list files.
   * %GUEST% is special user, it decides what unauthenticated clients can see.
   *
   * The rule format is the same as .gitingore file, but inverted.
   * Any path that matches the rule are the ones that can be accessed.
   *
   * Return undefined to disable the rule checks entirely.
   * This may save processing time for entirely public instance.
   */
  downloaders: [
    {
      username: '%GUEST%',
      rule: guestRule,

      /**
       * Whether to enable directory listing for this rule,
       * the global listing option must be true for this to function.
       *
       * @default true if ommited
       */
      listing: true,
    },
  ],

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
    'application/xml': 'pom',
    'application/java-archive': 'jar',
    'text/plain': ['md5', 'sha1', 'sha256', 'sha512'],
  },
} satisfies Config as Config
