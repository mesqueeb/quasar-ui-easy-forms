<template>
  <div v-else class="ef-range">
    <q-range v-model="cValue" v-bind="quasarProps" />
  </div>
</template>

<style lang="sass">
// $
@import '../../index.sass'

.ef-range:not(.ef-range--raw)
  padding-top: 30px
  padding-left: $md
  padding-right: $md
</style>

<script>
import merge from 'merge-anything'
import { isObject, isFullString, isFunction } from 'is-what'
import { QRange } from 'quasar'
import { getGenericValueType } from './sharedProps.js'

export default {
  components: { QRange },
  name: 'EfRange',
  inheritAttrs: false,
  props: {
    // prop categories: behavior content general model state style
    value: {
      category: 'model',
      inheritedProp: true,
      type: Object,
      validator: val => isObject(val) && 'min' in val && 'max' in val,
      default: { min: 0, max: 0 },
    },
    valueType: getGenericValueType('object'),
    // EF props:
    prefix: {
      category: 'labels',
      type: String,
      desc: 'Prefix shown inside the label.',
    },
    suffix: {
      category: 'labels',
      type: String,
      desc: 'Suffix shown inside the label.',
    },
    labelValue: {
      category: 'labels',
      type: Function,
      desc:
        'A **function** to format the value shown inside the left & right labels. When `undefined` it will default to the value with pre- & suffix (if they are set).',
      examples: ['val => `${val}.00 USD`'],
    },
    // Quasar props with modified defaults:
    labelAlways: {
      inheritedProp: 'modified',
      type: Boolean,
      default: true,
    },
    // Quasar props with modified behavior:
    disable: {
      inheritedProp: 'modified',
      type: Boolean,
      default: false,
      desc: 'Disables the ability to interact with the field. Is `true` when `readonly: true`',
    },
  },
  computed: {
    quasarProps () {
      return merge(this.$attrs, {
        // Quasar props with modified defaults:
        labelAlways: this.labelAlways,
        // Quasar props with modified behavior:
        leftLabelValue: this.cLeftLabelValue,
        rightLabelValue: this.cRightLabelValue,
        disable: this.cDisable,
      })
    },
    cValue: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      },
    },
    cDisable () {
      return this.$attrs.readonly || this.disable
    },
    cLeftLabelValue () {
      const { labelValueFn, value } = this
      const val = value.min
      return labelValueFn(val)
    },
    cRightLabelValue () {
      const { labelValueFn, value } = this
      const val = value.max
      return labelValueFn(val)
    },
    labelValueFn () {
      const { prefix, suffix, labelValue } = this
      if (isFunction(labelValue)) return labelValue
      return val => `${prefix || ''}${val}${suffix || ''}`
    },
  },
}
</script>
