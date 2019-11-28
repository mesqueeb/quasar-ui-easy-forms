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
import { isFullString, isFunction } from 'is-what'
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
    // Quasar props with modified defaults:
    labelAlways: {
      quasarProp: 'modified',
      type: Boolean,
      default: true,
      desc: 'This points to the label of the slider value.',
    },
    // Quasar props with modified behavior:
    labelValue: {
      quasarProp: 'modified',
      type: Function,
      desc: 'A **function** to format the value shown inside the label. When `undefined` it will default to the value with pre- & suffix (if they are set).',
      examples: ['val => `${val}.00 USD`'],
    },
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
        labelValue: this.cLabelValue,
        disable: this.cDisable,
      })
    },
    cValue: {
      get () { return this.value },
      set (val) { this.$emit('input', val) },
    },
    cDisable () { return this.$attrs.readonly || this.disable },
    cLabelValue () {
      const { value, prefix, suffix, labelValue } = this
      if (isFunction(labelValue)) return labelValue(value)
      return `${prefix || ''}${value}${suffix || ''}`
    },
  },
}
</script>
