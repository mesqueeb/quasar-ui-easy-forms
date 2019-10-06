<template>
  <div class="ef-slider">
    <q-slider
      v-model="cValue"
      v-bind="quasarProps"
    />
  </div>
</template>

<style lang="sass">
// $
@import '../../index.sass'

.ef-slider
  padding-top: 30px
  padding-left: $md
  padding-right: $md

</style>

<script>
import merge from 'merge-anything'
import { isFullString } from 'is-what'
import { QSlider } from 'quasar'
import { getGenericValueType } from './sharedProps.js'

export default {
  components: { QSlider },
  name: 'EfSlider',
  inheritAttrs: false,
  props: {
    // prop categories: behavior content general model state style
    value: {
      category: 'model',
      type: Number},
    valueType: getGenericValueType('number'),
    // EF props:
    prefix: {
      type: String,
      desc: 'Prefix shown inside the label.',
    },
    suffix: {
      type: String,
      desc: 'Suffix shown inside the label.',
    },
    // format: {
    //   type: Function,
    //   desc: 'Formats the slider label.',
    //   examples: ['val => val / 1000 + \'K\'', 'val => commafy(val)'],
    // },
    // Quasar props with modified defaults:
    labelAlways: {
      quasarProp: 'modified',
      type: Boolean,
      default: true,
    },
    // Quasar props with modified behavior:
    disable: {
      quasarProp: 'modified',
      type: Boolean,
      default: false,
      desc: 'Disables the ability to interact with the field. Is `true` when `readonly: true`'
    },
  },
  computed: {
    quasarProps () {
      return merge(this.$attrs, {
        // Quasar props with modified defaults:
        labelAlways: this.labelAlways,
        // Quasar props with modified behavior:
        labelValue: this.cFormat(this.cValue),
        disable: this.cDisable,
      })
    },
    cValue: {
      get () { return this.value },
      set (val) { this.$emit('input', val) },
    },
    cDisable () { return this.$attrs.readonly || this.disable },
  },
  methods: {
    cFormat (val) {
      const { prefix, suffix } = this
      // if (isFunction(format)) val = format(val)
      if (isFullString(prefix)) val = `${prefix}${val}`
      if (isFullString(suffix)) val = `${val}${suffix}`
      return val
    },
  }
}
</script>
