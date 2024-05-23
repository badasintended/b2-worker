import { factory } from './app'
import { directory } from './routes/directory'
import { file } from './routes/file'
import { staticRoutes } from './routes/static'
import { upload } from './routes/upload'

export default factory.createApp()
  .route('/', staticRoutes)

  .get('/', ...directory)
  .get(':dir{.*}/', ...directory)

  .get('*', ...file)

  .put('*', ...upload)
