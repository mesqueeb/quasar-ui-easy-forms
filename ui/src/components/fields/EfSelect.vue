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

</style>

<script>
import merge from 'merge-anything'
import copy from 'copy-anything'
import { isString, isPlainObject } from 'is-what'
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
      quasarProp: true,
      default: () => [],
      desc: 'The options to select from. Should be an array of strings or objects (`{label, value}`).\n\nFor best performance freeze the list of options with `Object.freeze`.',
      examples: [`[{label: 'JPY', value: 'jpy'}, {label: 'USD', value: 'usd'}]`, `['jpy', 'usd']`],
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
