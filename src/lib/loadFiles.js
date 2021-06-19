import { readdirSync } from 'fs'

export const loadFiles = (path) => {
  let files = readdirSync(path)

  if (files.length === 0) {
    return Promise.reject('empty dir')
  }

  files = files.map((file) => {
    return file.replace('.js', '')
  }).filter((file) => {
    return file !== 'index'
  })

  return Promise.resolve(files)
}

export const importComponents = (path) => {
  loadFiles(path).then((dir) => {
    const files = readdirSync(dir)

    console.log(files)
  })
}
