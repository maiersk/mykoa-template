import Router from 'koa-router'
import { routers, controllers } from '../components/'

const router = new Router

router.get('/', (ctx, next) => {
  ctx.result = 'test'
  next()
})

Object.keys(routers).forEach((key) => {
  const route = routers[key].default
  const routeObj = route ? route(Router, controllers) : false

  if (route && routeObj) {
    router.use(routeObj.routers(), router.allowedMethods())
  }
})

export default router