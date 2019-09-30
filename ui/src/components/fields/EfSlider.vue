<template>
  <div class="ef-slider">
    <q-slider
      v-model="cValue"
      v-bind="quasarProps"
    />
  </div>
</template>

<style lang="stylus" scoped>
// $
@import '../../index.styl'

.ef-slider
  pt 30px
  px md

</style>

<script>
import merge from 'merge-anything'
import { isFunction, isFullString } from 'is-what'
import { QSlider } from 'quasar'

export default {
  components: { QSlider },
  name: 'EfSlider',
  inheritAttrs: false,
  props: {
    // prop categories: behaviour content general model state style
    value: Number,
    // EF props:
    prefix: {
      type: String,
      description: 'Prefix shown inside the label.',
    },
    suffix: {
      type: String,
      description: 'Suffix shown inside the label.',
    },
    format: {
      type: Function,
      description: 'Formats the slider label.',
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
        labelValue: this.cFormat(this.cValue),
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
