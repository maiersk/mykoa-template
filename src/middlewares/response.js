import { logger } from './logger'

export const responseHandler = (ctx) => {
  if (ctx.result !== undefined) {
    ctx.type = 'json'
    ctx.body = {
      code: 200,
      msg: ctx.meg || '',
      data: ctx.result
    }
  }
}

export const errorHandel = (ctx, next) => {
  return next().catch((err) => {
    if (err.code === null) {
      logger.error(err.stack)
    }
    ctx.body = {
      code: err.code || -1,
      data: null,
      msg: err.message.trim()
    }
    ctx.status = 200
    return Promise.resolve()
  })
}