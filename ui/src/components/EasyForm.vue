<template>
  <div class="form-generator">
    <div class="_nav-row" v-if="actionButtons.length">
      <div
        class="_validation-error text-negative"
        v-if="isString(validatorMessage)"
      >{{ validatorMessage }}</div>
      <q-btn
        v-for="btn in actionButtons.filter(b => !isString(b))"
        :key="btn.label"
        :label="btn.label"
        class="_btn"
        push
        :color="btn.color || 'primary'"
        @click="e => tapCustomBtn(e, btn.handler)"
      />
      <q-btn
        v-if="actionButtons.includes('delete')"
        :label="l.delete"
        class="_btn"
        flat
        color="negative"
        @click="tapDelete"
      />
      <q-btn
        v-if="actionButtons.includes('archive')"
        :label="l.archive"
        class="_btn"
        flat
        color="negative"
        @click="tapArchive"
      />
      <q-btn
        v-if="(cMode === 'edit' || cMode === 'add') && actionButtons.includes('cancel')"
        :label="l.cancel"
        class="_btn"
        color="primary"
        flat
        @click="tapCancel"
      />
      <q-btn
        v-if="cMode === 'view' && actionButtons.includes('edit')"
        :label="l.edit"
        class="my-q-btn--small _btn"
        push
        @click="cMode = 'edit'"
      />
      <q-btn
        v-if="(cMode === 'edit' || cMode === 'add') && actionButtons.includes('save')"
        :label="l.save"
        class="my-q-btn--small _btn"
        push
        :disable="!validated"
        @click="tapSave"
      />
    </div>
    <div
      class="_form"
      :style="`grid-template-columns:${' 1fr'.repeat(columnCount)}; grid-gap: ${gridGap}`"
    >
      <EasyField
        v-for="field in cSchema"
        :key="field.id"
        v-bind="field"
        :value="innerData[field.id]"
        @input="value => fieldInput({id: field.id, value})"
        :class="field.fieldType === 'title' ? '-title' : ''"
        :style="field.span ? `grid-column: ${field.span === true ? '1 / -1' : `span ${field.span}`}` : ''"
      />
    </div>
  </div>
</template>

<style lang="stylus" scoped>
// $
@import '../index.styl'

// .form-generator
._form
  display grid
  align-items stretch
  justify-items stretch
  > .-title
    grid-column 1 / -1
._nav-row
  mb md
  min-height 42px
  display grid
  justify-content end
  align-items center
  grid-auto-flow column
  grid-gap md

</style>

<script>
import merge from 'merge-anything'
import copy from 'copy-anything'
import { isArray, isFunction, isString } from 'is-what'
import { nestifyObject } from 'nestify-anything'
import { QBtn } from 'quasar'
import flattenPerSchema from '../helpers/flattenPerSchema'
import l from '../helpers/formGeneratorLang'

function requiredValuePasses (value, blueprint = {}) {
  if (!blueprint.required) return true
  if (blueprint.fieldType === 'select' && blueprint.multiple) {
    return Object.values(value).some(v => v)
  }
  return value || value === 0
}
function checkRequiredFields (formData, schema) {
  const schemaAsObject = !isArray(schema)
    ? schema
    : schema.reduce((carry, blueprint) => {
      return {[blueprint.id]: blueprint, ...carry}
    }, {})
  const fieldsRequired = Object.entries(formData)
    .reduce((carry, [fieldId, value]) => {
      const blueprint = schemaAsObject[fieldId]
      const ok = requiredValuePasses(value, blueprint)
      if (!ok) carry.push(blueprint.label)
      return carry
    }, [])
  const labelsRequired = fieldsRequired.join('、')
  return labelsRequired
    ? `未記入：${labelsRequired}`
    : true
}

export default {
  name: 'EasyForm',
  components: { QBtn },
  props: {
    lang: { type: String, default: 'ja' },
    docId: { type: String },
    schema: { type: Array, required: true },
    data: { type: Object },
    columnCount: { type: Number, default: 1 },
    validator: { type: Function },
    actionButtons: {
      type: Array,
      default: () => ['cancel', 'archive', 'edit', 'save']
    },
    mode: {
      type: String,
      default: 'view',
      validator: val => ['edit', 'add', 'view'].includes(val)
    },
    gridGap: {
      type: String,
      default: '1em',
    },
  },
  data () {
    const innerMode = this.mode
    const dataFlat = flattenPerSchema(this.data, this.schema)
    const innerData = copy(dataFlat)
    return {
      innerMode,
      edited: false,
      editedFields: [],
      innerData,
      innerDataBackups: [copy(dataFlat)],
    }
  },
  watch: {
    data (newValue) {
      const innerData = copy(newValue)
      this.innerData = innerData
    },
  },
  computed: {
    l () { return l[this.lang] },
    nestedInnerData () { return nestifyObject(this.innerData) },
    schemaObject () {
      return this.schema.reduce((carry, blueprint) => {
        carry[blueprint.id] = blueprint
        return carry
      }, {})
    },
    cMode: {
      get () { return this.innerMode },
      set (val) {
        this.innerMode = val
        this.$emit('update:mode', val)
      },
    },
    cSchema () {
      const { cMode, schema, $store, nestedInnerData } = this
      function checkShowCondition ({ showCondition }) {
        if (!isFunction(showCondition)) return true
        return showCondition(nestedInnerData, cMode)
      }
      function assessDisable ({ disable }) {
        if (!isFunction(disable)) return disable
        return disable(nestedInnerData, cMode, $store)
      }
      function assessPath ({ path }) {
        if (!isFunction(path)) return path
        return path(nestedInnerData, $store)
      }
      return schema.reduce((carry, blueprint) => {
        // return early when showCondition fails
        if (!checkShowCondition(blueprint)) return carry
        const dataToOverwrite = (cMode === 'view')
          ? {path: assessPath(blueprint), disable: true, deletable: false, readonly: true}
          : {path: assessPath(blueprint), disable: assessDisable(blueprint)}
        if (blueprint.schema && cMode === 'view') {
          dataToOverwrite.schema = blueprint.schema.map(bp => {
            return merge(bp, {disable: true, deletable: false, readonly: true})
          })
        }
        carry.push(merge(blueprint, dataToOverwrite))
        return carry
      }, [])
    },
    dataBackup () {
      if (!this.innerDataBackups.length) return {}
      const lastBackup = this.innerDataBackups.slice(-1)[0]
      const dataNested = nestifyObject(lastBackup)
      return dataNested
    },
    dataEdited () {
      const { editedFields, innerData } = this
      const dataFlat = editedFields.reduce((carry, prop) => {
        carry[prop] = innerData[prop]
        return carry
      }, {})
      const dataNested = nestifyObject(dataFlat)
      return dataNested
    },
    validatorErrors () {
      const errors = []
      const requiredFieldsError = checkRequiredFields(
        merge(this.dataEdited),
        this.cSchema
      )
      if (isString(requiredFieldsError)) errors.push(requiredFieldsError)
      if (!isFunction(this.validator)) return errors
      const validatorRes = this.validator(this.dataEdited, this.dataBackup)
      if (isString(validatorRes)) errors.push(validatorRes)
      return errors
    },
    validatorMessage () {
      return this.validatorErrors.join('、\n')
    },
    validated () {
      const hasErrors = this.validatorMessage.length
      if (this.cMode === 'add') return !hasErrors
      return this.edited && !hasErrors
    },
  },
  methods: {
    isString,
    fieldInput ({id, value}) {
      console.log('field id → ', id, '| new value → ', value)
      this.$emit('field-input', {id, value})
      const blueprint = this.schemaObject[id]
      if (blueprint && isFunction(blueprint.onInput)) {
        const formRef = this
        blueprint.onInput(value, formRef, this.$store)
      }
      this.edited = true
      if (!this.editedFields.includes(id)) this.editedFields.push(id)
      this.innerData[id] = value
    },
    resetState () {
      this.cMode = 'view'
      this.edited = false
      this.editedFields = []
      this.innerDataBackups.push(copy(this.innerData))
    },
    restoreBackup () {
      if (!this.innerDataBackups.length) return
      const lastBackup = this.innerDataBackups.pop()
      this.innerData = lastBackup
    },
    tapCancel () {
      this.restoreBackup()
      this.resetState()
      this.$emit('cancel')
    },
    tapSave () {
      const newData = copy(this.dataEdited)
      const oldData = copy(this.dataBackup)
      this.$emit('save', {newData, oldData})
      this.resetState()
    },
    tapDelete () { this.$emit('delete') },
    tapArchive () { this.$emit('archive') },
    tapCustomBtn (event, btnHandler) {
      if (!isFunction(btnHandler)) throw new Error('button handler must be a function')
      btnHandler(this, event)
    },
  }
}
</script>
