import { controllers, models } from '../components/'

Object.keys(controllers).forEach((key) => {
  const { InitClass } = controllers[key]
  const controllerObj = InitClass ? InitClass(models) : false

  if (InitClass && controllerObj) {
    controllers[key] = controllerObj
  }
})

export default controllers