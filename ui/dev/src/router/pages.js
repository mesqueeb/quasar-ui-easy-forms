import { kebabCase, spaceCase } from 'case-anything'

/*
 * Export files list for /pages folder
 */
const pages = require.context('../pages', true, /^\.\/.*\.vue$/)
  .keys()
  .map(page => page.slice(2).replace('.vue', ''))
  .filter(page => page !== "Index")
  .map(page => ({
    file: page + '.vue',
    title: spaceCase(page),
    path: kebabCase(page),
  }))

export default pages
