
// export function rounded (value) {
//   if (!value) return ''
//   value = Number(value)
//   const len = 10 ** length
//   return Math.round(value * len) / len
// }

// export function floored (value, length = 2) {
//   if (!value) return ''
//   value = Number(value)
//   const len = 10 ** length
//   return Math.floor(value * len) / len
// }

export function isOdd (num) {
  return num % 2
}

// export function priceToNumber (priceString) {
//   if (!isNaN(priceString)) return priceString
//   if (!priceString) return 0
//   return Number(priceString.replace(/\D/g, ''))
// }
