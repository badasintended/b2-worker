import { factory } from '../app'
import { fileCache } from '../middleware/cache'

export const unauthorized = factory.createHandlers(fileCache, async c => c.text('Unauthorized', 401))
