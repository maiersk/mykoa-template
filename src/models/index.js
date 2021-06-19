import { loadFiles } from '../lib/loadFiles'
import sequelize from '../database/mysql'
import { DataTypes } from 'sequelize'
import { join } from 'path'

let db = []

loadFiles(join(__dirname, '/')).then((files) => {
  files.forEach((modelName) => {
    const model = require(join(__dirname, modelName)).default

    if (model) {
      db[modelName] = model(sequelize, DataTypes)
    }

    Object.keys(db).forEach(((modelName) => {
      if (db[modelName]?.associate ?? undefined) {
        db[modelName].associate(db)
      }
    }))
  })
})

export default db