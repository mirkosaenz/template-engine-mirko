const { compile } = require("./utils/template-engine-mirko")
const { readHTML } = require("./utils/readHTML")
const http = require("node:http")

const server = http.createServer(async (req, res) => {
  const template = await readHTML("static/template.html")
  const html = await compile(template, { nombre: "Pedro" })

  res.statusCode = 200
  res.setHeader("Content-Type", "text/html")
  res.end(html)
})

server.listen(3000, () => {
  console.log("asd")
})