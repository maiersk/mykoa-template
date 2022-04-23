import { join } from 'path'
import loadFiles from '../lib/loadFiles'

let comps = {}

const initComp = async function(comps) {
  const dirs = await loadFiles(join(__dirname, '/'))
  const _comps = comps

  dirs.forEach(async (dir) => {
    const dirObj = await require(join(__dirname, dir, 'index.js'))?.default ?? undefined

    if (dirObj) {
      Object.keys(dirObj).forEach((key) => {
        const compObj = dirObj[key]

        console.log(key, compObj.name, compObj)
        _comps[compObj.name] = compObj
      })
      console.log(comps)
    }
  })
}

initComp(comps)

export default comps