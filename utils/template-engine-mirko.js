function compile (template, objValues) {
  if (!template.includes("**")) return template


  try {
    const variablesCount = (template.split("**").length - 1) / 2
    if (Math.floor(variablesCount) != variablesCount) {
      throw new TypeError("No has cerrado la declaracion (falta ** ).")
    }

    const variables = replaceValues({ template, variablesCount, objValues })
    return variables
  } catch (e) {
    return { error: e }
  }
}

function replaceValues ({ template, variablesCount, objValues }) {
  try {
    let templateArray = template.split("")
    let indexStart = 0

    for (let i = 0; i < variablesCount; i++) {
      let firstIndex = templateArray.join("").indexOf("**", indexStart)
      let firstPosition = firstIndex + 2
      let nextPosition = templateArray.join("").indexOf("**", firstPosition)

      let variableLength = nextPosition - firstPosition
      let variableName = templateArray.slice(firstPosition, nextPosition).join("")
      let variableValue = objValues[variableName]
      let variableValueSeparated = variableValue.split("")

      templateArray.splice(firstIndex, variableLength + 4, ...variableValueSeparated)

      let newIndexStart = templateArray.indexOf(variableValue)


      indexStart = newIndexStart
    }

    return templateArray.join("")
  } catch (e) {
    return e
  }
}

module.exports = { compile }