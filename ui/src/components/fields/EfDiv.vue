<template>
  <div class="ef-div" v-bind="$attrs" v-on="$listeners">{{ cValue }}</div>
</template>

<style lang="sass">
// $
@import '../../index.sass'
</style>

<script>
import parseEasyFieldValue from '../../helpers/parseFieldValue.js'

export default {
  name: 'EfDiv',
  inheritAttrs: false,
  desc: `EfDiv is used to show the raw values of EasyForm data. This means that it will _just_ generate a single div.
- Using \`<EfDiv />\` will only render a div.
- Using \`<EasyField component="EfDiv" />\` will render a div inside an EasyField, so you can still use the EasyField label & sublabel etc.
When you pass no label or sublabel only the div will be shown.

The difference the EfDiv field over a regular div, is that it will parse your value as per your field's schema. It will parse your value based on the following schema props:
- \`type\`: shows numbers with thousands separator and dates as YYYY/MM/DD
- \`valueType\`: shows numbers with thousands separator and dates as YYYY/MM/DD
- \`suffix\`: value + suffix
- \`prefix\`: prefix + value
- \`options\`: shows the "label" of the option which has the value when passed
- \`multiple\`: checked when options are passed
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
    type: { category: 'model|content', type: String },
    suffix: { category: 'model|content', type: String },
    prefix: { category: 'model|content', type: String },
    options: { category: 'model|content', type: Array },
    multiple: { category: 'model|content', type: Boolean },
    // Quasar props with modified defaults:
    // Quasar props with modified behavior:
  },
  computed: {
    cValue () {
      const { value, valueType, type, options, suffix, prefix, multiple } = this
      return parseEasyFieldValue(
        value,
        { valueType: valueType || type, options, suffix, prefix, multiple },
        this
      )
    },
  },
  methods: {},
}
</script>
