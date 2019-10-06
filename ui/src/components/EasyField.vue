<template>
  <div class="easy-field" :style="contentStyle">
    <div
      v-if="label"
      :class="classFieldLabel"
    >{{ label }}</div>
    <div
      v-if="subLabel"
      :class="`easy-field__sub-label q-mb-sm text-wrap-all`"
    >{{ subLabel }}</div>
    <div
      class="easy-field__field"
      v-if="!['title', 'space', 'none', undefined].includes(fieldType)"
    >
      <component :is="componentIdentifier" v-model="cValue" v-bind="fieldProps" />
      <pre v-if="fieldType === 'q-markdown'" v-bind="fieldProps">{{ cValue }}</pre>
    </div>
  </div>
</template>

<style lang="sass">
// $
@import '../index.sass'

.easy-field
  max-width: 100%
  .easy-field__sub-label
    opacity: 0.8
    font-weight: 300

</style>

<script>
import { isFunction, isPlainObject } from 'is-what'
import merge from 'merge-anything'

export default {
  name: 'EasyField',
  props: {
    // prop categories: behavior content general model state style
    // EF props used here:
    fieldType: {
      category: 'general',
      type: [String, Object],
      required: true,
    },
    value: {
      category: 'model',
      type: undefined,
    },
    subLabel: {
      category: 'content',
      type: String,
      desc: 'A smaller label for extra info.',
    },
    contentStyle: {
      category: 'style',
      type: [Object, Array, String],
      desc: 'Custom styling to be applied to the EasyField. Applied like so `:style="contentStyle"`',
      examples: [`'padding: 1em;'`],
    },
    format: {
      category: 'model',
      type: Function,
      desc: 'You can change how the value is formatted even though the underlying data might be different. Depending on the `fieldType`, you will also need to provide a `parseInput` function to reverse the effect.',
      examples: ['val => thousandToK(val)' ],
    },
    parseInput: {
      category: 'model',
      type: Function,
      desc: 'You can change how the value is parsed before it\'s updated. You must return the parsed value.',
      examples: ['val => kToThousand(val)' ],
    },
    // Quasar props with modified defaults:
    // (category needs to be specified in case sub-field doesn't inherit this prop from Quasar)
    readonly: {
      category: 'state',
      quasarProp: 'modified',
      type: Boolean,
      default: false,
      desc: '`readonly` is used for \'view\' mode of an EasyForm.',
    },
    // Quasar props with modified behavior:
    // (category needs to be specified in case sub-field doesn't inherit this prop from Quasar)
    label: {
      category: 'content',
      quasarProp: 'modified',
      type: String,
      desc: 'An EasyField label is always "external" to the field. (It replaces the Quasar label)',
    },
    disable: {
      category: 'state',
      quasarProp: 'modified',
      type: Boolean,
      default: false,
      desc: '`disable` is ignored when `readonly` is true',
    },
  },
  computed: {
    componentIdentifier () {
      const { fieldType } = this
      if (!fieldType) return ''
      if (isPlainObject(fieldType)) return fieldType
      if (fieldType.slice(0, 2) === 'q-') return fieldType
      return 'Ef' + fieldType[0].toUpperCase() + fieldType.slice(1)
    },
    fieldProps () {
      return merge(this.$attrs, {
        // format: this.format,   // do not pass format
        // EF props used here, but also to pass:
        subLabel: this.subLabel,
        fieldType: this.fieldType,
        // Quasar props with modified defaults:
        readonly: this.readonly,
        // Quasar props with modified behavior:
        // label: this.label,     // do not pass label
        disable: this.cDisable,
      })
    },
    cValue: {
      get () {
        const { format, value } = this
        if (isFunction(format)) return format(value, this)
        return value
      },
      set (val) { this.updateValue(val) },
    },
    cDisable () {
      const { readonly } = this.$attrs
      if (readonly) return false
      const { disable } = this
      return disable
    },
    classFieldLabel () {
      const { fieldType, subLabel } = this
      let classes = '_label text-wrap-all'
      if (fieldType === 'title' || fieldType === 'form') {
        classes += ' q-mt-md text-bold'
      } else if (!subLabel) {
        classes += ' q-mb-sm'
      }
      return classes
    },
  },
  methods: {
    updateValue (val) {
      const { parseInput } = this
      if (isFunction(parseInput)) val = parseInput(val, this)
      this.$emit('input', val)
    },
  }
}
</script>
