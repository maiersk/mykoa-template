import Router from 'koa-router'
import comps from '../components/'

const router = new Router

router.get('/', (ctx, next) => {
  ctx.result = 'test'
  next()
})

Object.keys(comps).forEach((key) => {
  if (key === 'Router') {
    const route = comps[key].default
    const routeObj = route ? route(Router, comps) : false

    if (route && routeObj) {
      router.use(routeObj.routers(), router.allowedMethods())
    }
  }
})

export default router