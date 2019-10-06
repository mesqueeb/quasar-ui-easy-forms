<template>
  <q-select
    :class="[
      'ef-select', {
      '-big': big,
    }]"
    v-model="cValue"
    v-bind="quasarProps"
    v-on="$listeners"
  />
</template>

<style lang="sass">
// $
@import '../../index.sass'

.ef-select
  width: 100%
  .q-field__control
    border-radius: $md !important
  .q-field__control:before
    border: 3px $primary solid !important
  .q-field__suffix
    color: $text--dark
  .q-field__native
    color: $text--dark
    text-align: right
    > span
      width: 100%
  &.-big
    font-size: 25px
    .q-field__control
      padding-top: .4em !important
      padding-bottom: .4em !important
    .q-field__control:before
      border: 6px $primary solid !important
    .q-field__native
      line-height: 1.2 !important
    .q-select__dropdown-icon
      transform: scale(1.5)
  &.q-field--disabled
    .q-field__control
      background: $gray-bg
      > div
        opacity: 1 !important
    .q-field__control:before
      border: none !important
  &.q-field--readonly
    .q-field__control:before
      border: 1px $gray-bg--dark solid !important
    .q-field__control > div
      opacity: 1 !important

</style>

<script>
import merge from 'merge-anything'
import copy from 'copy-anything'
import { isFunction, isString, isPlainObject } from 'is-what'
import { QSelect } from 'quasar'
import { big } from './sharedProps.js'

export default {
  components: { QSelect },
  name: 'EfSelect',
  inheritAttrs: false,
  props: {
    // prop categories: behavior content general model state style
    value: {
      category: 'model',
      type: [String, Object, Number, Array]},
    // valueType inherited from `easyField`,
    // EF props:
    big,
    placeholder: {
      type: String,
      desc: 'Will be shown when nothing is selected. (Takes the place of the `label` Quasar prop, because with EfSelect the label is external.)'
    },
    // Quasar props with modified defaults:
    outlined: { quasarProp: 'modified', type: Boolean, default: true },
    mapOptions: { quasarProp: 'modified', type: Boolean, default: true },
    emitValue: { quasarProp: 'modified', type: Boolean, default: true },
    autogrow: { quasarProp: 'modified', type: Boolean, default: true },
    // Quasar props with modified behavior:
    label: {
      quasarProp: 'modified',
      type: String,
      desc: 'Hidden when a value is selected, shows the placeholder when nothing is selected.',
    },
    options: {
      quasarProp: 'modified',
      type: [Array, Function],
      default: () => [],
      desc: 'Can be an array of options (just like Quasar) or a Function which has to return an array. The function will receive the EfSelect Vue component and the store as parameters: \`options(this, this.$store)\`',
      examples: [`[{label: 'JPY', value: 'jpy'}]`],
    },
    hideDropdownIcon: {
      quasarProp: 'modified',
      type: Boolean,
      desc: 'Defaults to `true` when `readonly: true`',
    },
    useChips: {
      quasarProp: 'modified',
      type: Boolean,
      desc: 'Defaults to `true` when `multiple: true`',
    },
  },
  computed: {
    quasarProps () {
      return merge(this.$attrs, {
        // Quasar props with modified defaults:
        outlined: this.outlined,
        mapOptions: this.mapOptions,
        emitValue: this.emitValue,
        autogrow: this.autogrow,
        // Quasar props with modified behavior:
        label: this.cLabel,
        options: this.cOptions,
        hideDropdownIcon: this.cHideDropdownIcon,
        useChips: this.cUseChips,
      })
    },
    cValue: {
      get () {
        const { value, $attrs } = this
        return ($attrs.multiple)
          ? Object.keys(value).filter(key => value[key])
          : value
      },
      set (val) {
        const { value, $attrs } = this
        if (!$attrs.multiple) {
          const cleanVal = (isPlainObject(val) && ('value' in val))
            ? val.value
            : val
          this.$emit('input', cleanVal)
          return
        }
        const valueCopy = copy(value)
        const valueReset = Object.keys(value)
          .reduce((carry, key) => ({[key]: null, ...carry}), {})
        const cleanVal = val.reduce((carry, option) => {
          if (isString(option)) {
            carry[option] = valueCopy[option]
          } else {
            carry[option.value] = option.label
          }
          return carry
        }, valueReset)
        this.$emit('input', cleanVal)
      },
    },
    cLabel () {
      // hidden when a value is selected
      return this.cValue || this.cValue === 0
        ? undefined
        : this.placeholder
    },
    cOptions () {
      const { options } = this
      if (isFunction(options)) return options(this, this.$store)
      if (options.some(o => isString(o))) {
        return options.map(o => ({label: o, value: o}))
      }
      return options.filter(o => !o.disabled)
    },
    cHideDropdownIcon () {
      const { $attrs, hideDropdownIcon } = this
      return $attrs.readonly || hideDropdownIcon
    },
    cUseChips () {
      const { $attrs, useChips } = this
      return $attrs.multiple || useChips
    },
  },
  methods: {},
}
</script>
