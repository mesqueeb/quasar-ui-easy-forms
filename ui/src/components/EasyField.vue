<template>
  <div class="easy-field" :style="contentStyle">
    <div
      v-if="cLabel"
      :class="classFieldLabel"
    >{{ cLabel }}</div>
    <div
      v-if="cSubLabel"
      :class="`easy-field__sub-label q-mb-sm text-wrap-all`"
    >{{ cSubLabel }}</div>
    <div
      class="easy-field__field"
      v-if="!['title', 'space', 'none', undefined].includes(fieldType)"
    >
      <component
        :is="componentIdentifier"
        v-model="cValue"
        v-bind="fieldProps"
      />
      <!-- <pre
        v-if="fieldType === 'q-markdown'"
        v-bind="fieldProps"
      >{{ cValue }}</pre> -->
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
  inheritAttrs: false,
  props: {
    // prop categories: behavior content general model state style
    // EF props used here:
    fieldType: {
      category: 'general',
      type: [String, Object],
    },
    value: {
      category: 'model',
      type: undefined,
    },
    subLabel: {
      category: 'content',
      type: [String, Function],
      desc: 'A smaller label for extra info.',
    },
    contentStyle: {
      category: 'style',
      type: [Object, Array, String, Function],
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
    formDataNested: {
      category: 'easyFormProp',
      type: Object,
      desc: `This is the *nested* data of all the fields inside an EasyForm.`,
    },
    formDataFlat: {
      category: 'easyFormProp',
      type: Object,
      desc: `This is the *flattened* data of all the fields inside an EasyForm.`,
    },
    formId: {
      category: 'easyFormProp',
      type: String,
      desc: `A manually set 'id' of the EasyForm.`,
    },
    formMode: {
      category: 'easyFormProp',
      type: String,
      desc: 'The state of the EasyForm. Can be `view` | `edit` | `add`',
    },
    // Quasar props with modified defaults:
    // (category needs to be specified in case sub-field doesn't inherit this prop from Quasar)
    readonly: {
      category: 'state',
      quasarProp: 'modified',
      type: [Boolean, Function],
      default: false,
      desc: '`readonly` is used for \'view\' mode of an EasyForm.',
    },
    // Quasar props with modified behavior:
    // (category needs to be specified in case sub-field doesn't inherit this prop from Quasar)
    label: {
      category: 'content',
      quasarProp: 'modified',
      type: [String, Function],
      desc: 'An EasyField label is always "external" to the field. (It replaces the Quasar label)',
    },
    disable: {
      category: 'state',
      quasarProp: 'modified',
      type: [Boolean, Function],
      default: false,
      desc: '`disable` is ignored when `readonly` is true',
    },
  },
  computed: {
    internalLabelMode () {
      const { fieldType } = this
      const { externalLabels } = this.$attrs
      return externalLabels === false && [
        'input', 'inputDate', 'select'
      ].includes(fieldType)
    },
    componentIdentifier () {
      const { fieldType } = this
      if (!fieldType) return ''
      if (isPlainObject(fieldType)) return fieldType
      if (fieldType.slice(0, 2) === 'q-') return fieldType
      return 'Ef' + fieldType[0].toUpperCase() + fieldType.slice(1)
    },
    fieldProps () {
      // props only used here: format, parseInput, label
      const { cValue, internalLabelMode, fieldType } = this
      const self = this
      const mergedProps = merge(this.$attrs, {
        // EF props used here, but also to pass:
        fieldType: this.fieldType,
        labelRaw: this.label,
        subLabelRaw: this.subLabel,
        // Quasar props with modified defaults:
        readonly: this.readonly,
        // Quasar props with modified behavior:
        disable: this.cDisable,
      })
      // quasar props that can accept functions should be ignored:
      const propsToIgnore = [
        // EasyForm:
        'onInput', 'labelValue',
        // QSelect:
        'optionValue', 'optionLabel', 'optionDisable',
        // QUploader:
        'filter', 'factory', 'url', 'method', 'headers','fieldName','formFields','withCredentials','sendRaw','batch',
      ]
      function formatProp (propKey, propValue) {
        if (propsToIgnore.includes(propKey)) {
          return propValue
        }
        return (isFunction(propValue))
          ? propValue(cValue, self)
          : propValue
      }
      return Object.entries(mergedProps)
        .reduce((carry, [propKey, propValue]) => {
          carry[propKey] = formatProp(propKey, propValue)
          return carry
        }, {})
    },
    cValue: {
      get () {
        const { format, value } = this
        if (isFunction(format)) return format(value, this)
        return value
      },
      set (val) { this.updateValue(val) },
    },
    cLabel () {
      const { label, cValue, internalLabelMode } = this
      if (isFunction(label)) return label(cValue, this)
      return internalLabelMode ? undefined : label
    },
    cSubLabel () {
      const { subLabel, cValue, internalLabelMode } = this
      if (isFunction(subLabel)) return subLabel(cValue, this)
      return internalLabelMode ? undefined : subLabel
    },
    cDisable () {
      const { readonly } = this.$attrs
      if (readonly) return false
      const { disable } = this
      return disable
    },
    classFieldLabel () {
      const { fieldType, cSubLabel } = this
      let classes = 'easy-field__label text-wrap-all'
      if (fieldType === 'title' || fieldType === 'form') {
        classes += ' q-mt-md text-bold'
      } else if (!cSubLabel) {
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
