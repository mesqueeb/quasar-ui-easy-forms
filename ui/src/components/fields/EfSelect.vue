<template>
  <EfDiv v-if="rawValue" class="ef-select" v-bind="divProps" />
  <q-select v-else class="ef-select" v-model="cValue" v-bind="quasarProps" v-on="$attrs.events" />
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
import { getGenericValueType } from './sharedProps.js'

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

Problems with this data model:
- You cannot retain a specific "order"

A note on events: \`<EfSelect />\` requires the native modifier when applying events directly in the template.`,
  props: {
    // prop categories: behavior content general model state style
    value: {
      category: 'model',
      type: undefined, // any
    },
    valueType: getGenericValueType([
      'object',
      'string',
      'boolean',
      'number',
      'array',
      'date',
      'null',
      'undefined',
    ]),
    // EF props:
    rawValue: { type: Boolean }, // requires these props for EfDiv: valueType, suffix, prefix, options, multiple
    placeholder: {
      category: 'content|model',
      type: String,
      desc: `Will be shown if \`(externalLabels ||  (!externalLabels && stackLabel))\``,
    },
    // Quasar props with modified defaults:
    outlined: { inheritedProp: 'modified', type: Boolean, default: true },
    autogrow: { inheritedProp: 'modified', type: Boolean, default: true },
    // Quasar props with modified behavior:
    // label: {
    //   inheritedProp: 'modified',
    //   type: String,
    //   desc: 'Hidden when a value is selected, shows the placeholder when nothing is selected.',
    // },
    options: {
      inheritedProp: true,
      default: () => [],
      desc:
        'The options to select from. Should be an array of strings or objects (`{label, value}`).\n\nFor best performance freeze the list of options with `Object.freeze`.',
      examples: [`[{label: 'JPY', value: 'jpy'}, {label: 'USD', value: 'usd'}]`, `['jpy', 'usd']`],
    },
    hideDropdownIcon: {
      inheritedProp: 'modified',
      type: Boolean,
      desc: 'Defaults to `true` when `readonly: true`',
    },
    useChips: {
      inheritedProp: 'modified',
      type: Boolean,
      desc: 'Defaults to `true` when `multiple: true`',
    },
  },
  computed: {
    quasarProps () {
      return merge(this.$attrs, {
        // Quasar props with modified defaults:
        outlined: this.outlined,
        autogrow: this.autogrow,
        // Quasar props with modified behavior:
        clearable: this.cClearable,
        label: this.cLabel,
        options: this.cOptions,
        hideDropdownIcon: this.cHideDropdownIcon,
        useChips: this.cUseChips,
      })
    },
    divProps () {
      return merge(this.$attrs, {
        value: this.value,
        valueType: this.valueType,
        options: this.options,
      })
    },
    cValue: {
      get () {
        const { value, valueType, placeholder } = this
        const { multiple, label, stackLabel } = this.$attrs
        if (value === undefined || value === null) {
          // show the placeholder as "value" under these conditions:
          return label && stackLabel ? placeholder : value
        }
        if (valueType === 'object' && multiple) {
          return Object.entries(value).reduce((carry, [value, label]) => {
            // filter out those that are `null`
            if (label) carry.push({ value, label })
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
          const base = isPlainObject(originalValue)
            ? Object.keys(originalValue).reduce((carry, key) => ({ ...carry, [key]: null }), {})
            : {}
          const cleanValue = val.reduce((carry, option) => {
            if (isString(option)) return merge(carry, { [option]: option })
            return merge(carry, { [option.value]: option.label })
          }, base)
          this.$emit('input', cleanValue)
          return
        }
        this.$emit('input', val)
      },
    },
    cClearable () {
      // don't show clearable when the value is the placeholder
      const { value } = this
      const { clearable, label, stackLabel } = this.$attrs
      return label && stackLabel ? !!value : clearable
    },
    cLabel () {
      const { cValue, placeholder } = this
      const { label, stackLabel } = this.$attrs
      // show label when passed
      if (label) return label
      // show the placeholder as "label" under these conditions:
      return cValue === undefined || cValue === null ? placeholder : undefined
    },
    cOptions () {
      const { options } = this
      if (options.some(o => isString(o))) {
        return options.map(o => ({ label: o, value: o }))
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
