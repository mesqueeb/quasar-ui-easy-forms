<template>
  <q-select
    :class="[
      'ef-select', {
      '-big': big,
    }]"
    v-model="cValue"
    v-bind="quasarProps"
    v-on="$attrs.events"
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
import { isString, isPlainObject, isArray } from 'is-what'
import { QSelect } from 'quasar'
import { getGenericValueType, big, externalLabels } from './sharedProps.js'

export default {
  components: { QSelect },
  name: 'EfSelect',
  inheritAttrs: false,
  desc: `EfSelect works just like QSelect. One difference is when you pass \`multiple: true, valueType: 'object'\`. In this case you can select multiple options, but your model will be **an object** (with QSelect it is an array).
An example of your field's _value_ could look like this: \`{ '1': 'one', '2': null }\`
This would be linked to options that look like this:
\`\`\`js
{
  {value: '1', label: 'one'},
  {value: '2', label: 'two'},
}
\`\`\`
Options which were never selected won't exist on your model. Options that were selected once, but then un-selected will be replaced by \`null\` to play nice with Vue's reactivity system & other services like Firestore syncing.

Benefits of this data model:
- you can easily check if an option is selected or not
- you can easily print out a list of the labels that are selected
- you can easily retrieve the value's that are selected
- you don't need to use QSelect's "mapOptions" which has a performance penalty
- EfForm formats your model for you just by passing \`multiple: true, valueType: 'object'\`
- (The only downside is that your array of options may only have strings for its values)

A note on events: \`<EfSelect />\` requires the native modifier when applying events directly in the template.`,
  props: {
    // prop categories: behavior content general model state style
    value: {
      category: 'model',
      type: undefined, // any
    },
    valueType: getGenericValueType(['object', 'string', 'boolean', 'number', 'array', 'date', 'null', 'undefined']),
    // EF props:
    big,
    externalLabels,
    placeholder: {
      type: String,
      desc: `Will be shown when nothing is selected, but only if 'externalLabels' is not disabled. (Takes the place of the 'label' Quasar prop, because with EfSelect the label is external.)`
    },
    // Quasar props with modified defaults:
    outlined: { quasarProp: 'modified', type: Boolean, default: true },
    autogrow: { quasarProp: 'modified', type: Boolean, default: true },
    // Quasar props with modified behavior:
    // label: {
    //   quasarProp: 'modified',
    //   type: String,
    //   desc: 'Hidden when a value is selected, shows the placeholder when nothing is selected.',
    // },
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
      const overWriteLabelAndHint = (this.externalLabels === false)
        ? {
          label: this.$attrs.labelRaw,
          hint: this.$attrs.subLabelRaw,
        } : {}
      return merge(this.$attrs, {
        // Quasar props with modified defaults:
        outlined: this.outlined,
        autogrow: this.autogrow,
        // Quasar props with modified behavior:
        label: this.cLabel,
        options: this.cOptions,
        hideDropdownIcon: this.cHideDropdownIcon,
        useChips: this.cUseChips,
      }, overWriteLabelAndHint)
    },
    cValue: {
      get () {
        const { value, valueType, $attrs } = this
        if (value === undefined) return value
        if (valueType === 'object' && $attrs.multiple) {
          return Object.entries(value)
            .reduce((carry, [value, label]) => {
              // filter out those that are `null`
              if (label) carry.push({value, label})
              return carry
            }, [])

        }
        return value
      },
      set (val) {
        const { $attrs, valueType, value } = this
        if (!$attrs.multiple) {
          this.$emit('input', val)
          return
        }
        if (valueType === 'object') {
          // we must get the original value and create a base
          // where all keys are null to comply by our description
          // of how `multiple: true, valueType: 'object'` works
          const originalValue = value
          const base = Object.keys(originalValue)
            .reduce((carry, key) => ({...carry, [key]: null}), {})
          const cleanValue = val.reduce((carry, option) => {
            if (isString(option)) return merge(carry, {[option]: option})
            return merge(carry, {[option.value]: option.label})
          }, base)
          this.$emit('input', cleanValue)
          return
        }
        this.$emit('input', val)
      },
    },
    cLabel () {
      // hidden when a value is selected
      const { cValue, placeholder } = this
      return (cValue || cValue === 0)
        ? undefined
        : placeholder
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
