import { isFunction } from 'is-what'

export default function parseCodeForPrint (code) {
  // return early on 0, undefined, null, etc.
  if (!code) return code
  const stringifiedFns = []
  function replacer (key, value) {
    if (isFunction(value) && value.prototype.stringifiedFn) {
      const fnString = value.prototype.stringifiedFn
      stringifiedFns.push(fnString)
      return fnString
    }
    return value
  }
  const string = JSON.stringify(code, replacer, 2)
  const cleanedString = string.replace(/'/g, `\\'`).replace(/"/g, `'`)
  const parsedString = stringifiedFns.reduce((str, fnString) => {
    const fnStringRegex = `'${fnString.replace(/'/g, `\\'`).replace(/"/g, `'`)}'`
    return str.replace(fnStringRegex, fnString)
  }, cleanedString)
  return parsedString
}
