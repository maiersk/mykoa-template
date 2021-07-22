import { join } from 'path'
import loadFiles from '../lib/loadFiles'

let models = []
let controllers = []
let services = []
let routers = []
let testings = []

loadFiles(join(__dirname, '/')).then((dirs) => { 
  dirs.forEach((dir) => {
    const dirObj = require(join(__dirname, dir, 'index.js'))?.default ?? undefined

    if (dirObj) {
      Object.keys(dirObj).forEach((key) => {
        const compObj = dirObj[key]

        console.log(key, compObj.name, compObj)
        if (key === 'Model') {
          models[compObj.name] = compObj
        } else if (key === 'Controler') {
          controllers[compObj.name] = compObj
        } else if (key === 'Service') {
          services[compObj.name] = compObj
        } else if (key === 'Router') {
          routers[compObj.name] = compObj
        } else if (key === 'Testing') {
          testings[compObj.name] = compObj
        }
      })

    }
  })
})

export {
  models, controllers, services, routers, testings
}