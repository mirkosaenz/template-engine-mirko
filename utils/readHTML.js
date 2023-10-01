const fs = require("fs/promises")

async function readHTML (route) {
  let fileData = await fs.readFile(route, "utf-8")
  return fileData
}

module.exports = { readHTML }