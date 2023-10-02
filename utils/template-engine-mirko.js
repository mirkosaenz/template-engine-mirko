import { readHTML } from './readHTML.js'

async function compile (templateURL, objValues) {
  const template = await readHTML(templateURL)

  if (!template.includes('**')) return template

  try {
    const variablesCount = (template.split('**').length - 1) / 2
    if (Math.floor(variablesCount) !== variablesCount) {
      throw new TypeError('No has cerrado la declaracion (falta ** ).')
    }

    const variables = replaceValues({ template, variablesCount, objValues })
    return variables
  } catch (e) {
    return { error: e }
  }
}

function replaceValues ({ template, variablesCount, objValues }) {
  try {
    const templateArray = template.split('')
    let indexStart = 0

    for (let i = 0; i < variablesCount; i++) {
      const firstIndex = templateArray.join('').indexOf('**', indexStart)
      const firstPosition = firstIndex + 2
      const nextPosition = templateArray.join('').indexOf('**', firstPosition)

      const variableLength = nextPosition - firstPosition
      const variableName = templateArray.slice(firstPosition, nextPosition).join('')
      const variableValue = objValues[variableName]
      const variableValueSeparated = variableValue.split('')

      templateArray.splice(firstIndex, variableLength + 4, ...variableValueSeparated)

      const newIndexStart = templateArray.indexOf(variableValue)

      indexStart = newIndexStart
    }

    return templateArray.join('')
  } catch (e) {
    return e
  }
}

export { compile }
