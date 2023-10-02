import { readFile } from 'fs/promises'

async function readHTML (route) {
  const fileData = await readFile(route, 'utf-8')
  return fileData
}

export { readHTML }
