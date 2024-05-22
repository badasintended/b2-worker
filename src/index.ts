import { factory } from './app'
import { auth } from './middleware/auth'
import { directory } from './routes/directory'
import { file } from './routes/file'
import { staticRoutes } from './routes/static'

export default factory.createApp()
  .route('/', staticRoutes)

  .route('/', factory.createApp()
    .use(auth)

    .get('/', ...directory)
    .get(':dir{.*}/', ...directory)

    .get('*', ...file))
