import sequelize from '../database/mysql'
import { DataTypes } from 'sequelize'
import { models } from '../components/'

Object.keys(models).forEach((key) => {
  const model = models[key]

  if (model) {
    model(sequelize, DataTypes)
  }
})

Object.keys(models).forEach((key) => {
  if (models[key]?.associate ?? undefined) {
    models[key].associate(models)
  }
})

export default models