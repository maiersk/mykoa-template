import { readdirSync } from 'fs'

export default function loadFiles(path) {
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