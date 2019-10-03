import { isFullString } from 'is-what'

export function kebabCase (string) {
  const result = string.replace(
    /[A-Z\u00C0-\u00D6\u00D8-\u00DE]/g,
    match => '-' + match.toLowerCase()
  )
  return (string[0] === string[0].toUpperCase())
    ? result.substring(1)
    : result
}

export function slugify (string) {
  return encodeURIComponent(String(string).trim().replace(/\s+/g, '-'))
}

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

export function capitalize (string) {
  return string[0].toUpperCase() + string.slice(1)
}
