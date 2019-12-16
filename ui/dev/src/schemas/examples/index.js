export { default as easyFields } from './easyFields'

export const basics = {
  code: [require('./basics').default],
  string: [require('!!raw-loader!./basics').default],
}
export const actionButtons = {
  code: [require('./actionButtons').default],
  string: [require('!!raw-loader!./actionButtons').default],
}
export const advanced = {
  code: [require('./advanced').default],
  string: [require('!!raw-loader!./advanced').default],
}
export const nestedData = {
  code: [require('./nestedData').default],
  string: [require('!!raw-loader!./nestedData').default],
}
export const responsiveStyle = {
  code: [require('./responsiveStyle').default],
  string: [require('!!raw-loader!./responsiveStyle').default],
}
export const selectModel = {
  code: [require('./selectModel').default],
  string: [require('!!raw-loader!./selectModel').default],
}
export const evaluatedProps = {
  code: [
    require('./evaluatedProps1').default,
    require('./evaluatedProps2').default,
    require('./evaluatedProps3').default,
    require('./evaluatedProps4').default,
  ],
  string: [
    require('!!raw-loader!./evaluatedProps1').default,
    require('!!raw-loader!./evaluatedProps2').default,
    require('!!raw-loader!./evaluatedProps3').default,
    require('!!raw-loader!./evaluatedProps4').default,
  ],
}
export const events = {
  code: [require('./events1').default, require('./events2').default],
  string: [require('!!raw-loader!./events1').default, require('!!raw-loader!./events2').default],
}
