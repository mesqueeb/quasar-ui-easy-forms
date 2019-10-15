
const extractNumbers = str => str.replace(/[^\d]/g, '').trim()
const isJapaneseTel = str => str.length >= 10 && str.length <= 12
// length 10: 03 0000 0000
// length 11: 090 0000 0000
// length 11: +813 0000 0000
// length 12: +8190 0000 0000

export function telJA (val) {
  if (!val) return true
  const numbers = extractNumbers(val)
  return isJapaneseTel(numbers) || '入力が間違っています'
}

// eslint-disable-next-line no-useless-escape
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export const email = val => !val ? true : (emailRegex.test(val) || '入力が間違っています')

export const rulesMap = {
  telJA, email
}
