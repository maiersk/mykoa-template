import { resolve } from 'path'

module.exports = {
  backend: {
    domain: '',
    host: '127.0.0.1',
    port: 3001
  },
  db: {
    host: '127.0.0.1',
    port: 3306,
    database: 'project_database',
    dialect: 'mysql',
    username: 'root',
    password: 'root'
  },
  logsPath: resolve(__dirname, '../logs/koa.log')
}
