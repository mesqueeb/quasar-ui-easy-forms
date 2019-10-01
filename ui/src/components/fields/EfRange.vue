<template>
  <div class="ef-range">
    <q-range
      v-model="cValue"
      v-bind="quasarProps"
    />
  </div>
</template>

<style lang="stylus" scoped>
// $
@import '../../index.styl'

.ef-range
  pt 30px
  px md

</style>

<script>
import merge from 'merge-anything'
import { isObject, isFullString, isFunction } from 'is-what'
import { QRange } from 'quasar'

export default {
  components: { QRange },
  name: 'EfRange',
  inheritAttrs: false,
  props: {
    // prop categories: behaviour content general model state style
    value: {
      quasarProp: true,
      type: Object,
      desc: `Model of the component of type \`{ min, max }\` (both values must be between global \`min\`/\`max\`); Either use this property (along with a listener for \`'input'\` event) OR use v-model directive`,
      validator: val => isObject(val) && ('min' in val) && ('max' in val),
      default: {min: 0, max: 0},
    },
    // EF props:
    prefix: {
      type: String,
      desc: 'Prefix shown inside the label.',
    },
    suffix: {
      type: String,
      desc: 'Suffix shown inside the label.',
    },
    format: {
      type: Function,
      desc: 'Formats the slider label.',
      examples: ['val => val / 1000 + \'K\'', 'val => commafy(val)'],
    },
    // Quasar props with modified defaults:
    labelAlways: {
      quasarProp: true,
      type: Boolean,
      default: true,
    },
    // Quasar props with modified behaviour:
  },
  computed: {
    quasarProps () {
      return merge(this.$attrs, {
        // Quasar props with modified defaults:
        labelAlways: this.labelAlways,
        // Quasar props with modified behaviour:
        leftLabelValue: this.cFormat(this.cValue.min),
        rightLabelValue: this.cFormat(this.cValue.max),
      })
    },
    cValue: {
      get () { return this.value },
      set (val) { this.$emit('input', val) },
    },
  },
  methods: {
    cFormat (val) {
      const { format, prefix, suffix } = this
      if (isFunction(format)) val = format(val)
      if (isFullString(prefix)) val = `${prefix}${val}`
      if (isFullString(suffix)) val = `${val}${suffix}`
      return val
    },
  }
}
</script>
