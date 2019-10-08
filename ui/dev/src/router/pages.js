/*
 * Export files list for /pages folder
 */

function kebabCase (str) {
  const result = str.replace(
    /[A-Z\u00C0-\u00D6\u00D8-\u00DE]/g,
    match => '-' + match.toLowerCase()
  )
  return (str[0] === str[0].toUpperCase())
    ? result.substring(1)
    : result
}

function slugify (str) {
  return encodeURIComponent(String(str).trim().replace(/\s+/g, '-'))
}

const pages = require.context('../pages', true, /^\.\/.*\.vue$/)
  .keys()
  .map(page => page.slice(2).replace('.vue', ''))
  .filter(page => page !== "Index")
  .map(page => ({
    file: page,
    title: page + '.vue',
    path: slugify(kebabCase(page)),
  }))

const order = [
  'Basic',
  'Advanced',
]

const pagesOrdered = order
  .map(name => pages.find(p => p.file === name))
  .concat(pages.filter(p => !order.includes(p.file)))

export default pagesOrdered
