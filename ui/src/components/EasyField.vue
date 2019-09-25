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
      v-if="!['title', 'form', 'space', undefined].includes(fieldType)"
    >
      <EfButtons
        v-if="fieldType === 'buttons'"
        v-model="cValue"
        v-bind="fieldProps"
      />
      <EfDropdown
        v-if="fieldType === 'dropdown'"
        v-model="cValue"
        v-bind="fieldProps"
      />
      <EfInput
        v-if="fieldType === 'input'"
        v-model="cValue"
        v-bind="fieldProps"
      />
      <EfInputDate
        v-if="fieldType === 'date'"
        v-model="cValue"
        v-bind="fieldProps"
      />
      <EfRange
        v-if="fieldType === 'range'"
        v-model="cValue"
        v-bind="fieldProps"
      />
      <EfSlider
        v-if="fieldType === 'slider'"
        v-model="cValue"
        v-bind="fieldProps"
      />
      <EfVideo
        v-if="fieldType === 'video'"
        v-model="cValue"
        v-bind="fieldProps"
      />
      <EfToggle
        v-if="fieldType === 'toggle'"
        v-model="cValue"
        v-bind="fieldProps"
      />
      <EfImg
        v-if="fieldType === 'img'"
        v-model="cValue"
        v-bind="fieldProps"
      />
      <EfPdf
        v-if="fieldType === 'pdf'"
        v-model="cValue"
        v-bind="fieldProps"
      />
      <EfUploaderFirebase
        v-if="fieldType === 'uploaderFirebase'"
        v-model="cValue"
        v-bind="fieldProps"
      />
    </div>
    <div
      class="_field _sub-form"
      v-if="fieldType === 'form' && valueType === 'array'"
    >
      <!-- TODO: add sub-form as form-generator -->
      <div
        class="_sub-row"
        v-for="(row, rowIndex) in cValue"
        :style="`grid-template-columns:${' 1fr'.repeat(columnsSubForm)}`"
        :key="rowIndex"
      >
        <EasyField
          v-for="(subfield, fieldIndex) in schema"
          :key="fieldIndex"
          class="_sub-field"
          :field="rowIndex > 0 ? merge({disable: cDisable}, subfield, {label: ''}) : merge({disable: cDisable}, subfield)"
          :style="subfield.span === true ? 'grid-column: 1 / -1' : subfield.span ? `grid-column: span ${subfield.span}` : ''"
          :value="cValue[rowIndex][subfield.id]"
          @input="value => setSubFieldValue(value, rowIndex, subfield.id)"
          @keyup.native.delete="onDeleteKey(rowIndex, subfield.id)"
        />
      </div>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
// $
@import '../index.styl'

// .easy-field
._sub-label
  opacity 0.8
  font-weight 300
._sub-form
  mt md
  ._sub-row
    display grid
    justify-items stretch
    align-items flex-end
    grid-gap sm
    mb sm

</style>

<script>
import copy from 'copy-anything'
import merge from 'merge-anything'
import { isNumber } from 'is-what'

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
      validator: prop => ['string', 'boolean', 'number', 'array', 'object', 'date'].includes(prop),
      description: 'valueType is the type of the model of the field. Can be any of \'string\', \'boolean\', \'number\', \'array\', \'object\'.\n\nWhen `valueType: \'number\'` it will make sure the field value is formatted as Number. `valueType` will also provide extra documentation so is best always specified.',
      examples: ['string', 'boolean', 'number', 'array', 'object', 'date'],
    },
    subLabel: {
      category: 'content',
      type: String,
      description: 'A smaller label for extra info.',
    },
    contentStyle: {
      category: 'style',
      type: [Object, Array, String],
      description: 'Custom styling to be applied to the EasyField. Applied like so `:style="contentStyle"`',
      examples: ['padding: 1em;'],
    },
    schema: {
      category: 'model',
      type: Array,
      description: '(only for `fieldType: \'form\'`) An array of objects formatted just like an EasyForm.',
    },
    maxRows: {
      category: 'model',
      type: Number,
      description: '(only for `fieldType: \'form\'`) Allows to limit the max amount of rows.',
    },
    // Quasar props with modified defaults:
    // Quasar props with modified behaviour:
    label: {
      type: String,
      quasarProp: true,
    },
    disable: {
      type: Boolean,
      default: false,
      quasarProp: true,
      description: '`disable` is ignored when `readonly` is true',
    },
  },
  computed: {
    fieldProps () {
      return merge(this.$attrs, {
        // label: this.label,     // do not pass label
        // maxRows: this.maxRows, // maxRows & schema are only used here
        // schema: this.schema,

        // EF props used here, but also to pass:
        subLabel: this.subLabel,
        fieldType: this.fieldType,
        valueType: this.valueType,
        // Quasar props with modified defaults:
        // Quasar props with modified behaviour:
        disable: this.cDisable,
      })
    },
    cValue: {
      get () {
        const { value, fieldType, valueType, cDisable, maxRows } = this
        if (
          value !== undefined &&
          fieldType === 'form' &&
          valueType === 'array' &&
          !cDisable &&
          (!isNumber(maxRows) || maxRows < value.length)
        ) {
          return value.concat([{}])
        }
        return value
      },
      set (value) {
        this.$emit('input', value)
      },
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
    columnsSubForm () {
      const { schema } = this
      if (!schema) return 0
      return schema.reduce((total, field) => {
        const add = field.span || 1
        return total + add
      }, 0)
    },
  },
  methods: {
    merge,
    deleteRow (rowIndex) {
      const allRows = copy(this.value)
      if (allRows[rowIndex] === undefined) return
      allRows.splice(rowIndex, 1)
      this.$emit('input', allRows)
    },
    setSubFieldValue (newValue, rowIndex, fieldId) {
      const allRows = copy(this.value)
      if (allRows[rowIndex] === undefined) this.$set(allRows, rowIndex, {})
      allRows[rowIndex][fieldId] = newValue
      this.$emit('input', allRows)
    },
    onDeleteKey (rowIndex, fieldId) {
      const allRows = this.value
      const row = allRows[rowIndex]
      if (!row) return
      if (Object.keys(row).every(key => row[key] === '' || row[key] === 0)) {
        this.deleteRow(rowIndex)
      }
    }
  }
}
</script>
