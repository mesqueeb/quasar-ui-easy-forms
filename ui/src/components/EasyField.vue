<template>
  <div class="easy-field" :style="contentStyle">
    <div
      v-if="label"
      :class="classFieldLabel"
    >{{ label }}</div>
    <div
      v-if="subLabel"
      :class="`_sub-label mb-sm text-wrap-all`"
    >{{ subLabel }}</div>
    <div
      class="_field"
      v-if="!['title', 'space', 'none', undefined].includes(fieldType)"
    >
      <component :is="componentIdentifier" v-model="cValue" v-bind="fieldProps" />
    </div>
  </div>
</template>

<style lang="stylus" scoped>
// $
@import '../index.styl'

.easy-field
  max-width 100%
._sub-label
  opacity 0.8
  font-weight 300

</style>

<script>
import { isFunction } from 'is-what'
import merge from 'merge-anything'

export default {
  name: 'EasyField',
  props: {
    // prop categories: behaviour content general model state style
    value: [Object, Array, String, Number, Boolean, Date],
    // EF props used here:
    fieldType: {
      category: 'general',
      type: String,
      required: true,
    },
    valueType: {
      category: 'model',
      type: String,
      validator: prop => ['string', 'boolean', 'number', 'array', 'object', 'date', 'null'].includes(prop),
      desc: 'valueType is the type of the model of the field. Can be any of \'string\', \'boolean\', \'number\', \'array\', \'object\'.\n\nWhen `valueType: \'number\'` it will make sure the field value is formatted as Number. `valueType` will also provide extra documentation so is best always specified.',
      examples: ['string', 'boolean', 'number', 'array', 'object', 'date', 'null'],
      values: ['string', 'boolean', 'number', 'array', 'object', 'date', 'null'],
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
      examples: ['padding: 1em;'],
    },
    format: {
      category: 'behaviour',
      type: Function,
      desc: 'You can change how the value is formatted even though the underlying data might be different. Depending on the `fieldType`, you will also need to provide a `parseInput` function to reverse the effect.',
      examples: ['val => thousandToK(val)' ],
    },
    parseInput: {
      category: 'behaviour',
      type: Function,
      desc: 'You can change how the value is parsed before it\'s updated. You must return the parsed value.',
      examples: ['val => kToThousand(val)' ],
    },
    // Quasar props with modified defaults:
    readonly: {
      quasarProp: true,
      type: Boolean,
      default: false,
      desc: '`readonly` is used for \'view\' mode of an EasyForm.',
    },
    // Quasar props with modified behaviour:
    label: {
      quasarProp: true,
      type: String,
    },
    disable: {
      quasarProp: true,
      type: Boolean,
      default: false,
      desc: '`disable` is ignored when `readonly` is true',
    },
  },
  computed: {
    componentIdentifier () {
      const { fieldType } = this
      if (!fieldType) return ''
      return 'Ef' + fieldType[0].toUpperCase() + fieldType.slice(1)
    },
    fieldProps () {
      return merge(this.$attrs, {
        // format: this.format,   // do not pass format
        // EF props used here, but also to pass:
        subLabel: this.subLabel,
        fieldType: this.fieldType,
        valueType: this.valueType,
        // Quasar props with modified defaults:
        readonly: this.readonly,
        // Quasar props with modified behaviour:
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
        classes += ' mt-md text-bold'
      } else if (!subLabel) {
        classes += ' mb-sm'
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
