import { isFullString } from 'is-what'

export function stringToJs (string) {
  if (!isFullString(string)) return undefined
  const jsonString = string
    .replace(/([a-zA-Z0-9]+?):/g, '"$1":')
    .replace(/'/g, '"')
  let parsed
  try {
    parsed = JSON.parse(jsonString)
  } catch (e) {
    return string
  }
  return parsed
}
