/*
 * Export files list for /pages folder
 */

export default require.context('../pages', true, /^\.\/.*\.vue$/)
  .keys()
  .map(page => page.slice(2).replace('.vue', ''))
  .filter(page => page !== "Index")
  .map(page => ({
    file: page,
    title: page + '.vue',
    path: page.toLowerCase()
  }))
