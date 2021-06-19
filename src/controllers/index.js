import { join } from 'path'
import { loadFiles } from '../lib/loadFiles'
import models from '../models/'

let controllers = []

loadFiles(join(__dirname, '/')).then((files) => {
  files.forEach((controllerName) => {
    const { InitClass } = require(join(__dirname, controllerName))
    const controllerObj = InitClass ? InitClass(models) : false

    if (InitClass && controllerObj) {
      controllers[controllerName] = controllerObj
    }
  })
})

export default controllers