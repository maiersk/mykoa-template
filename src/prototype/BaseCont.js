import { Op } from 'sequelize'
import { RouterError, InvalidQueryError } from '../lib/routerError'

export default class BaseCont {
  constructor(options) {
    this.model = options.model

    this.getAll = this.getAll.bind(this)
    this.get = this.get.bind(this)
    this.create = this.create.bind(this)
    this.update = this.update.bind(this)
    this.delete = this.delete.bind(this)

    this.include = options.include || []
    this.includeModels = {}
    if (this.include.length) {
      this.include.forEach((item) => {
        this.includeModels[item.model.name] = item.model
      })
    }

    this.resultTemplate = options.resultTemplate || undefined
  }

  async getAll(ctx, next) {
    try {
      const { query, page = 0, count = 5 } = ctx.query
      const model = await this.model.findAndCountAll({
        where: query ? { name: { [Op.like]: `%${query}%`} } : {},
        include: this.include,
        limit: +count,
        offset: page !== 0? page * +count : page
      })

      ctx.result = model.rows
      next()
      ctx.body = {
        ...ctx.body,
        page: +page,
        total: model.count,
        total_pages: Math.floor((model.count + +count - 1) / +count)
      }
    } catch (error) {
      throw new RouterError(error.message)
    }
  }

  async get(ctx, next) {
    try {
      const { id } = ctx.params
      let model = await this.model.findOne({
        where: { id },
        include: this.include
      })

      if (!model) throw new InvalidQueryError('没有该id实例')
      if (this.resultTemplate) {
        model = this.resultTemplate(model)
      }
      ctx.result = model
      next()
    } catch (error) {
      throw new RouterError(error.message)
    }
  }

  async create(ctx, next, params) {
    try {
      let model = await this.model.create(params)

      if (this.resultTemplate) {
        model = this.resultTemplate(model)
      }
      ctx.result = model
      ctx.msg = 'created'
      next()
    } catch (error) {
      throw new RouterError(error.message)
    }
  }

  async update(ctx, next, params, callback) {
    try {
      const id = ctx.params.id

      const model = await this.model.findByPk(id)
      if (!model) throw new InvalidQueryError('没有该id实例')
      if (callback) callback(model)

      let _model = await this.model.update(params, { where: { id } })

      if (this.resultTemplate) {
        _model = this.resultTemplate(_model)
      }
      ctx.result = _model
      ctx.msg = 'updated'
      next()
    } catch (error) {
      throw new RouterError(error.message)
    }
  }

  async delete(ctx, next, callback) {
    try {
      const id = ctx.params.id

      const model = await this.model.findByPk(id)
      if (!model) throw new InvalidQueryError('没有该id实例')
      if (callback) { callback(model) }

      await this.model.destroy({
        where: { id }
      })

      ctx.result = ''
      ctx.msg = 'delete'
      next()
    } catch (error) {
      throw new RouterError(error.message)
    }
  }
}