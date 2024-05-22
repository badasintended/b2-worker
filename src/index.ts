import { factory } from './app'
import { auth } from './middleware/auth'
import { directory } from './routes/directory'
import { file } from './routes/file'

const app = factory.createApp()

app.use(auth)

app.get('/', ...directory)
app.get(':dir{.*}/', ...directory)

app.get('*', ...file)

export default app
