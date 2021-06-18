import { readdirSync } from 'fs'
import { join } from 'path'

importComponents(join(__dirname, '/'))

importComponents = async (path) => {
  let dirs = await readdirSync(path)

  if (dirs.length === 0) {
    console.log('empty dir')
    return
  }
  dirs = dirs.map((dir) => {
    return dir.replace('.js', '')
  })
  dirs.forEach((dir) => {
    if (dir !== 'index') {
      const files = readdirSync(dir)

      
    }
  })
}
