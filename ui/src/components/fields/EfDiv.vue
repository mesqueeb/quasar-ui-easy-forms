<template>
  <div
    class="ef-div"
    v-bind="$attrs"
    v-on="$listeners"
  >{{ cValue }}</div>
</template>

<style lang="sass">
// $
@import '../../index.sass'

</style>

<script>
import { isFunction, isPlainObject, isArray, isString, isDate } from 'is-what'
import commafy from 'commafy-anything'
import { date } from 'quasar'
const { formatDate } = date

export function dateStamp (date) {
  if (isString(date)) date = new Date(date)
  if (!isDate(date)) return 'date error'
  return formatDate(date, 'YYYY/MM/DD')
}

/**
 * takes a value and returns the parsed value based on an EasyField blueprint provided.
 *
 * @export
 * @param {*} value any value. In our example blueprint `1` should be returned as `'one'`
 * @param {Object} blueprint a blueprint like eg.
 *     `{options: [{value: 1, label: 'one'}]}`
 *     Besides `options` you can also have `prefix` and `suffix` or
 *     a function passed as `format`, in which case other settings are ignored.
 * @returns {*} the parsed value
 */
export function formatEasyFieldValue (value, blueprint, component) {
  if (!blueprint) return value
  const { valueType, options, suffix, prefix, format } = blueprint
  let newValue = value
  if (isArray(options)) {
    if (valueType === 'object' && isPlainObject(value)) {
      newValue = Object.values(value).filter(v => v).join(', ')
    } else {
      const valueArray = !isArray(value) ? [value] : value
      newValue = valueArray.map(selectedValue => {
        const option = options.find(o => o.value === selectedValue) || {}
        return option.label || selectedValue
      }).join(', ')
    }
  }
  if (isFunction(format)) newValue = format(newValue, component)
  // prevent conflicts when a custom format function is passed:
  if (valueType === 'date' && !isFunction(format)) newValue = dateStamp(newValue)
  if (valueType === 'number' && !isFunction(format)) newValue = commafy(newValue)
  if (suffix) newValue = `${newValue}${suffix}`
  if (prefix) newValue = `${prefix}${newValue}`
  return newValue
}

export default {
  name: 'EfDiv',
  inheritAttrs: false,
  desc: `The "div" field can be used to show the raw values of EasyForm data. This means that it will _just_ generate a single div.
- Using \`<EfDiv />\` will only render a div.
- Using \`<EasyField field-type="div" />\` will render a div inside an EasyField, so you can still use the EasyField label & sublabel etc.
When you pass no label or sublabel only the div will be shown.

One benefit of the "div" field over a regular div, is that it will format your value as per your field's schema. It will parse your value based on the following schema props:
- \`valueType\`: shows numbers with thousands separator and dates as YYYY/MM/DD
- \`options\`: shows the "label" of the option which has the value when passed
- \`suffix\`: value + suffix
- \`prefix\`: prefix + value
- \`format\`: this custom format function is executed
`,
  props: {
    // prop categories: behavior content general model state style
    // EF props:
    value: { category: 'model', type: undefined },
    valueType: {
      category: 'model',
      type: String,
      desc: `valueType can be any type.`,
    },
    options: {category: 'model|content', type: Array},
    suffix: {category: 'model|content', type: String},
    prefix: {category: 'model|content', type: String},
    format: {category: 'model', type: Function},
    // Quasar props with modified defaults:
    // Quasar props with modified behavior:
  },
  computed: {
    cValue () {
      const { value, valueType, options, suffix, prefix, format } = this
      return formatEasyFieldValue(
        value,
        { valueType, options, suffix, prefix, format },
        this
      )
    },
  },
  methods: {}
}
</script>
