import app from '../index'
import { backend, db } from '../config'
import sequelize from '../database/mysql'
import { createConnection } from 'mysql2/promise'

initialize()

async function initialize() {
  try {
    const { host, port, username, password, database } = db

    const connection = await createConnection({ host, port, user: username, password }) 
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`)

    await sequelize.authenticate()
    console.log('connection has been')
    await sequelize.sync({ force: false })

    await app.listen(backend.port, () => {
      console.log(`listen prot: ${backend.port}`);
    })
  } catch (err) {
    console.log('unable to connect to the database: ', err.message)
    await sequelize.close()
    await process.exit()
  }
}