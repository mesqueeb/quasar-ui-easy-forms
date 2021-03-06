// Configuration for your app
// https://quasar.dev/quasar-cli/quasar-conf-js

const path = require('path')

module.exports = function (ctx) {
  return {
    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    boot: ['vueComponents.js', 'register.js'],

    css: ['app.sass'],

    extras: [
      // 'ionicons-v4',
      // 'mdi-v4',
      // 'fontawesome-v5',
      // 'eva-icons',
      // 'themify',
      // 'roboto-font-latin-ext', // this or either 'roboto-font', NEVER both!

      'roboto-font', // optional, you are not bound to it
      'material-icons', // optional, you are not bound to it
    ],

    framework: {
      // iconSet: 'ionicons-v4', // Quasar icon set
      // lang: 'de', // Quasar language pack

      // Possible values for "all":
      // * 'auto' - Auto-import needed Quasar components & directives
      //            (slightly higher compile time; next to minimum bundle size; most convenient)
      // * false  - Manually specify what to import
      //            (fastest compile time; minimum bundle size; most tedious)
      // * true   - Import everything from Quasar
      //            (not treeshaking Quasar; biggest bundle size; convenient)
      all: 'auto',

      components: [
        'QBtn',
        'QIcon',
        'QPopupProxy',
        'QColor',
        'QInput',
        'QBtnToggle',
        'QSlider',
        'QSelect',
        'QToggle',
        'QOptionGroup',
      ],
      directives: ['ClosePopup'],

      // Quasar plugins
      plugins: ['Dialog', 'Notify'],
    },

    supportIE: false,

    // animations: 'all', // --- includes all animations
    animations: [],

    build: {
      vueRouterMode: 'history',

      chainWebpack (chain) {
        chain.resolve.alias.merge({
          ui: path.resolve(__dirname, '../src/index.js'),
        })
        chain.module
          .rule('md')
          .test(/\.md$/i)
          .use('raw-loader')
          .loader('raw-loader')
      },
    },

    devServer: {
      // port: 8080,
      open: 'firefox', // opens browser window automatically
    },
  }
}
