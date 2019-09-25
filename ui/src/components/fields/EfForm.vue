<template>
  <div class="ef-form">
    <div
      class="_row"
      :style="`grid-template-columns:${' 1fr'.repeat(columnCountSubForm)}`"
    >
      <EasyField
        v-for="(subfield, fieldIndex) in schemaLabels"
        :key="fieldIndex"
        class="_sub-field"
        v-bind="subfield"
        :style="subfield.span === true ? 'grid-column: 1 / -1' : subfield.span ? `grid-column: span ${subfield.span}` : ''"
      />
    </div>
    <div
      class="_row"
      v-for="(row, rowIndex) in cValue"
      :style="`grid-template-columns:${' 1fr'.repeat(columnCountSubForm)}`"
      :key="rowIndex"
    >
      <EasyField
        v-for="(subfield, fieldIndex) in cSchema"
        :key="fieldIndex"
        class="_sub-field"
        v-bind="subfield"
        :style="subfield.span === true ? 'grid-column: 1 / -1' : subfield.span ? `grid-column: span ${subfield.span}` : ''"
        :value="cValue[rowIndex][subfield.id]"
        @input="val => setSubFieldValue(val, rowIndex, subfield.id)"
        @keyup.native.delete="onDeleteKey(rowIndex, subfield.id)"
      />
    </div>
  </div>
</template>

<style lang="stylus" scoped>
// $
@import '../../index.styl'

.ef-form
  mt md
  ._row
    display grid
    justify-items stretch
    align-items flex-end
    grid-gap sm
    mb sm

</style>

<script>
import merge from 'merge-anything'
import copy from 'copy-anything'
import { isNumber } from 'is-what'

export default {
  name: 'EfForm',
  props: {
    // prop categories: behaviour content general model state style
    value: {
      type: Array,
      default: () => [],
    },
    // EF props used here:
    valueType: {
      category: 'model',
      type: String,
      validator: val => (!val || val === 'array'),
      description: 'Defaults to \'array\'. Currently only \'array\' is supported.',
      default: 'array',
      values: ['array'],
    },
    schema: {
      category: 'model',
      type: Array,
      description: 'This is the information on the columns you want to be shown. An array of objects just like an EasyForm.',
      default: () => [{fieldType: 'input'}],
      examples: ['[{label: \'Amount\', id: \'amount\', fieldType: \'input\', valueType: \'number\'}, {label: \'Currency\', id: \'curr\', fieldType: \'select\', options: [{label: \'USD\', value: \'usd\'}]}]'],
    },
    maxRows: {
      category: 'model',
      type: Number,
      description: 'Allows to limit the max amount of rows.',
    },
    disable: {type: Boolean},
  },
  computed: {
    cValue: {
      get () {
        const { value, disable, maxRows } = this
        if (
          !disable &&
          (!isNumber(maxRows) || maxRows < value.length)
        ) {
          return value.concat([{}])
        }
        return value
      },
      set (val) {
        this.$emit('input', val)
      },
    },
    cSchema () {
      const { schema, disable } = this
      return schema.map(subfield => {
        return merge({disable}, subfield, {label: ''})
      })
    },
    schemaLabels () {
      const { schema } = this
      return schema.map(subfield => {
        return merge(subfield, {fieldType: 'none'})
      })
    },
    columnCountSubForm () {
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
      const { value } = this
      const allRows = copy(value)
      if (allRows[rowIndex] === undefined) return
      allRows.splice(rowIndex, 1)
      this.$emit('input', allRows)
    },
    setSubFieldValue (newValue, rowIndex, fieldId) {
      const { value } = this
      const allRows = copy(value)
      if (allRows[rowIndex] === undefined) this.$set(allRows, rowIndex, {})
      allRows[rowIndex][fieldId] = newValue
      this.$emit('input', allRows)
    },
    onDeleteKey (rowIndex, fieldId) {
      const { value, deleteRow } = this
      const allRows = value
      const row = allRows[rowIndex]
      if (!row) return
      if (Object.keys(row).every(key => row[key] === '' || row[key] === 0)) {
        deleteRow(rowIndex)
      }
    }
  }
}
</script>
