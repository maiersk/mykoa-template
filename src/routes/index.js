import { join } from 'path'
import Router from 'koa-router'
import loadFile from '../lib/loadFiles'
import controllers from '../controllers/'

const router = new Router

router.get('/', (ctx, next) => {
  ctx.result = 'test'
  next()
})

loadFile(join(__dirname, '/')).then((files) => {
  files.forEach((routerName) => {
    const route = require(join(__dirname, routerName)).default
    const routeObj = route ? route(Router, controllers) : false

    if (route && routeObj) {
      router.use(routeObj.routes(), router.allowedMethods())
    }
  })
})

export default router