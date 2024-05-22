import { FILLME, type PrivateConfig } from '../src/config'

export default {
  /**
   * Backblaze API keys.
   * Need to only have access to single bucket.
   */
  b2: {
    keyId: FILLME(),
    key: FILLME(),
  },

  /**
   * Mapping of username and password for uploading.
   */
  accounts: {},
} satisfies PrivateConfig
