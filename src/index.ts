import { factory } from './app'
import { config } from './config'
import { directory } from './routes/directory'
import { file } from './routes/file'
import { staticRoutes } from './routes/static'
import { unauthorized } from './routes/unauthorized'
import { uploadPost, uploadPut, uploader } from './routes/upload'

const rUploader = config.uploader ? uploader : unauthorized
const rUploadPost = config.uploader ? uploadPost : unauthorized
const rUploadPut = config.uploader ? uploadPut : unauthorized

const rDirectory = config.listing ? directory : unauthorized

export default factory.createApp()
  .route('/', staticRoutes)

  .get('/uploader', ...rUploader)
  .post('/uploader', ...rUploadPost)
  .put('*', ...rUploadPut)

  .get('/', ...rDirectory)
  .get(':dir{.*}/', ...rDirectory)

  .get('*', ...file)
