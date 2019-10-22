<template>
  <div class="ef-form">
    <div
      class="ef-form__row"
      :style="`grid-template-columns:${' 1fr'.repeat(columnCountSubForm)}`"
    >
      <EasyField
        v-for="(subfield, fieldIndex) in schemaLabels"
        :key="fieldIndex"
        class="ef-form__sub-field"
        v-bind="subfield"
        :style="subfield.span === true ? 'grid-column: 1 / -1' : subfield.span ? `grid-column: span ${subfield.span}` : ''"
      />
    </div>
    <div
      class="ef-form__row"
      v-for="(row, rowIndex) in cValue"
      :style="`grid-template-columns:${' 1fr'.repeat(columnCountSubForm)}`"
      :key="rowIndex"
    >
      <EasyField
        v-for="(subfield, fieldIndex) in cSchema"
        :key="fieldIndex"
        class="ef-form__sub-field"
        v-bind="subfield"
        :style="subfield.span === true ? 'grid-column: 1 / -1' : subfield.span ? `grid-column: span ${subfield.span}` : ''"
        :value="cValue[rowIndex][subfield.id]"
        @input="val => setSubFieldValue(val, rowIndex, subfield.id)"
        @keyup.native.delete="onDeleteKey(rowIndex, subfield.id)"
      />
    </div>
  </div>
</template>

<style lang="sass">
// $
@import '../../index.sass'

.ef-form
  margin-top: $md
  >.ef-form__row
    display: grid
    justify-items: stretch
    align-items: flex-end
    grid-gap: $sm
    margin-bottom: $sm

</style>

<script>
import merge from 'merge-anything'
import copy from 'copy-anything'
import { isNumber } from 'is-what'
import { getGenericValueType } from './sharedProps.js'

export default {
  name: 'EfForm',
  inheritAttrs: false,
  desc: `EfForm is a single component to which you can pass a "schema". The difference between \`<EasyField fieldType="form" />\` and \`<EasyForm />\` is that the former can be used _as part of_ the latter. The "schema" passed to this component will be parsed as a list with rows. Each EasyField object in the "schema" will be added as a single column.\n(EfForm has nothing to do with QForm)`,
  props: {
    // prop categories: behavior content general model state style
    value: {
      category: 'model',
      type: Array,
      default: () => [],
    },
    valueType: getGenericValueType('array'),
    // EF props used here:
    schema: {
      category: 'model',
      type: Array,
      desc: 'This is the information on the columns you want to be shown. An array of objects just like an EasyForm.',
      default: () => [{fieldType: 'input'}],
      examples: ['[{label: \'Amount\', id: \'amount\', fieldType: \'input\', valueType: \'number\'}, {label: \'Currency\', id: \'curr\', fieldType: \'select\', options: [{label: \'USD\', value: \'usd\'}]}]'],
    },
    maxRows: {
      category: 'model',
      type: Number,
      desc: 'Allows to limit the max amount of rows.',
    },
    // props of which to inherit "description" etc. from EasyField:
    disable: {type: Boolean},
    readonly: {type: Boolean},
  },
  computed: {
    cValue: {
      get () {
        const { value, schema, disable, readonly, maxRows } = this
        const emptyRow = schema.reduce((carry, {id, fieldType}) => ({...carry, [id]: undefined}), {})
        if (
          !disable &&
          !readonly &&
          (!isNumber(maxRows) || maxRows < value.length)
        ) {
          return value.concat([emptyRow])
        }
        return value
      },
      set (val) {
        this.$emit('input', val)
      },
    },
    cSchema () {
      const { schema, disable, readonly } = this
      return schema.map(subfield => {
        return merge({disable, readonly}, subfield, {label: '', subLabel: ''})
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
