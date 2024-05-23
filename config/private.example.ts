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
} satisfies PrivateConfig as PrivateConfig
