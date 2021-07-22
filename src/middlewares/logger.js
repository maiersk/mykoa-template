import { existsSync, mkdirSync } from 'fs'
import { configure, getLogger } from 'log4js'
import { parse } from 'path'
import { logsPath } from '../config/'

const logsDir = parse(logsPath).dir
if (!existsSync(logsDir)) {
  mkdirSync(logsDir)
}

configure({
  appenders: {
    console: { type: 'console' },
    dateFile: {
      type: 'dateFile',
      filename: logsPath,
      pattern: '-yyyy-MM-dd'
    }
  },
  categories: {
    default: {
      appenders: ['console', 'dateFile'],
      level: 'info'
    }
  }
})

export const logger = getLogger('[Default]')
export const loggerMiddleware = async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start

  const remoteAddress = ctx.headers['x-forwarded-for'] ||
    ctx.id || ctx.ips ||
    (ctx.socket && (ctx.socket.remoteAddress || (ctx.socket.socket && ctx.socket.socket.remoteAddress)))

  let logText = `${ctx.method} ${ctx.status} ${ctx.url} 请求参数： ${JSON.stringify(ctx.request.body)} 响应参数： ${JSON.stringify(ctx.body)} - ${remoteAddress} - ${ms}ms`

  logger.info(logText)
}