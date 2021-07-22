import Koa from 'koa'
import cors from '@koa/cors'
import bodyParser from 'koa-bodyparser'
import koastatic from 'koa-static'
import router from './routes/'
import { join } from 'path'

import { loggerMiddleware } from './middlewares/logger'
import { errorHandel, responseHandler } from './middlewares/response'

const app = new Koa()

app.use(loggerMiddleware)
  .use(errorHandel)
  .use(bodyParser())
  .use(cors({
    credentials: true
  }))
  .use(koastatic(join(__dirname, 'files')))
  .use(router.routes())
  .use(responseHandler)

export default app
