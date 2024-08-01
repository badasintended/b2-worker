import type { PrivateConfig } from '../src/config'

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
      rule: '*',
    },
  ],
} satisfies PrivateConfig as PrivateConfig
