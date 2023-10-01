const texto = "Nombre: **nombre**, Apellido: **apellido**"
const index = texto.indexOf("**") + 2
const segundoIndex = texto.indexOf("**", index)
const largo = segundoIndex - index

function compile (template, objValues) {
  if (!template.includes("**")) return template


  try {
    const variablesCount = (texto.split("**").length - 1) / 2
    if (Math.floor(variablesCount) != variablesCount) {
      throw new TypeError("No has cerrado la declaracion (falta **)")
    }

    const variables = obtainVariables({ template, variablesCount, objValues })
    return variables
  } catch (e) {
    return { error: e }
  }
}

function obtainVariables ({ template, variablesCount, objValues }) {
  let firstIndex = 0
  let nextIndex = 0

  try {
    let templateArray = template.split("")
    let variables = []
    let indexStart = 0

    for (let i = 0; i < variablesCount; i++) {
      let firstIndex = templateArray.join("").indexOf("**", indexStart)
      let firstPosition = firstIndex + 2
      let nextPosition = templateArray.join("").indexOf("**", firstIndex + 2)

      let variableLength = nextPosition - firstPosition
      let variableName = templateArray.slice(firstPosition, nextPosition).join("")
      let variableValue = objValues[variableName]

      templateArray.splice(firstPosition, variableLength, variableValue)

      console.log(templateArray.join("").indexOf(variableValue) + variableValue.length)
      //Primero elimina los asteriscos
      //Despues hace esto para que de 18 cuando pones "nombre" (pq ese es el index que funciona)
      // Pone este valor en indexStart

      indexStart = nextPosition + 2
    }

    return variables
  } catch (e) {
    return e
  }
}

compile(texto, { nombre: "nombre", apellido: "Perez" })