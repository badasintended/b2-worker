import { factory } from './app'
import { directory } from './routes/directory'
import { file } from './routes/file'
import { staticRoutes } from './routes/static'
import { uploadPost, uploadPut, uploader } from './routes/upload'

export default factory.createApp()
  .route('/', staticRoutes)

  .get('/uploader', ...uploader)
  .post('/uploader', ...uploadPost)
  .put('*', ...uploadPut)

  .get('/', ...directory)
  .get(':dir{.*}/', ...directory)

  .get('*', ...file)
