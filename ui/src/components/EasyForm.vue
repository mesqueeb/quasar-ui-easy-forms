<template>
  <div
    class="easy-form q-gutter-lg"
    :style="{flexDirection: ['top', 'bottom'].includes(actionButtonsPosition) ? 'column' : 'row'}"
  >
    <div
      class="easy-form__nav-row"
      :style="{
        order: ['top', 'left'].includes(actionButtonsPosition) ? 0 : 1,
        gridAutoFlow: ['top', 'bottom'].includes(actionButtonsPosition) ? 'column' : 'row',
      }"
      v-if="actionButtons.length"
    >
      <div
        class="easy-form__validation-error text-negative"
        v-if="isFullString(validatorMessage)"
      >{{ validatorMessage }}</div>
      <EfBtn
        v-for="btn in actionButtons.filter(b => !isFullString(b))"
        :key="btn.label"
        :value="btn.label"
        size="md"
        push
        :color="btn.color || 'primary'"
        @click="e => tapCustomBtn(e, btn.handler)"
      />
      <EfBtn
        v-if="actionButtons.includes('delete')"
        :value="l.delete"
        size="md"
        flat
        color="negative"
        @click="tapDelete"
      />
      <EfBtn
        v-if="actionButtons.includes('archive')"
        :value="l.archive"
        size="md"
        flat
        color="negative"
        @click="tapArchive"
      />
      <EfBtn
        v-if="(cMode === 'edit' || cMode === 'add') && actionButtons.includes('cancel')"
        :value="l.cancel"
        size="md"
        color="primary"
        flat
        @click="tapCancel"
      />
      <EfBtn
        v-if="cMode === 'view' && actionButtons.includes('edit')"
        :value="l.edit"
        size="md"
        push
        @click="cMode = 'edit'"
      />
      <EfBtn
        v-if="(cMode === 'edit' || cMode === 'add') && actionButtons.includes('save')"
        :value="l.save"
        size="md"
        push
        :disable="!validated"
        @click="tapSave"
      />
    </div>
    <div
      class="easy-form__form"
      :style="`grid-template-columns:${' 1fr'.repeat(columnCount)}; grid-gap: ${gridGap}`"
    >
      <EasyField
        v-for="field in cSchema"
        :key="field.id"
        v-bind="field"
        :form-data-nested="formDataNested"
        :form-data-flat="formDataFlat"
        :form-mode="formMode"
        :form-id="formId"
        :external-labels="externalLabels"
        :value="formDataFlat[field.id]"
        @input="value => fieldInput({id: field.id, value})"
        :class="field.fieldType === 'title' ? '-title' : ''"
        :style="field.span ? `grid-column: ${field.span === true ? '1 / -1' : `span ${field.span}`}` : ''"
      />
    </div>
  </div>
</template>

<style lang="sass" scoped>
// $
@import '../index.sass'

.easy-form
  display: flex
.easy-form__form
  display: grid
  align-items: stretch
  justify-items: stretch
  > .-title
    grid-column: 1 / -1
.easy-form__nav-row
  min-height: 42px
  display: grid
  justify-content: end
  align-content: start
  align-items: center
  grid-auto-flow: column
  grid-gap: $md

</style>

<script>
import merge from 'merge-anything'
import copy from 'copy-anything'
import { isArray, isFunction, isFullString } from 'is-what'
import { nestifyObject } from 'nestify-anything'
import flattenPerSchema from '../helpers/flattenPerSchema'
import lang from '../meta/lang'
import EfBtn from './fields/EfBtn.vue'
import EasyField from './EasyField.vue'

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
  components: { EfBtn, EasyField },
  props: {
    // prop categories: behavior content general model state style
    value: {
      category: 'model',
      type: Object,
      desc: `An object with the data of the entire form. The object keys are the ids of the fields passed in the 'schema'.\nTo be used with \`:value\` or \`v-model\`.`,
      default: () => ({}),
      examples: [`{name: ''}`],
    },
    id: {
      category: 'model',
      type: String,
      desc: `A manually set 'id' of the EasyForm. This prop is accessible in the \`context\` of the Function of any "evaluated prop"*.

Read more on Evaluated Props in its dedicade page.`,
    },
    schema: {
      category: 'model',
      type: Array,
      required: true,
      desc: `This is the heart of your EasyForm. It's the schema that will defined what fields will be generated.`,
      examples: [`[{id: 'name', fieldType: 'input'}]`],
    },
    mode: {
      category: 'state',
      type: String,
      default: 'view',
      validator: prop => ['edit', 'add', 'view'].includes(prop),
      values: ['edit', 'add', 'view'],
      examples: [`'edit'`, `'add'`, `'view'`],
      desc: 'The state of the EasyForm.',
    },
    actionButtons: {
      category: 'content',
      type: Array,
      default: () => ['cancel', 'archive', 'edit', 'save'],
      desc: `Buttons on top of the form that control the 'mode' of the form; clicking them will $emit the following events: 'cancel', 'save', 'delete', 'archive'.

You can decide which buttons you want to show/hide by passing them in an array to \`:action-buttons="[]"\`. You can also pass custom buttons with a label and handler.`,
      examples: [`[] (no buttons)`, `['delete', 'cancel', 'edit', 'save']`, `[{label: 'log', handler: console.log}]`],
    },
    actionButtonsPosition: {
      category: 'content',
      type: String,
      default: 'top',
      desc: `The position of the action buttons.`,
      examples: ['top', 'bottom', 'right', 'left'],
      values: ['top', 'bottom', 'right', 'left'],
      validator: prop => ['top', 'bottom', 'right', 'left'].includes(prop),
    },
    validator: {
      category: 'behavior',
      type: Function,
      desc: `A function which serves as global validator for your form. It will receive the edited data as first param and the original data (before user edits) as second. It should return true if all is OK or a string with error message.`,
      examples: [`(newData, oldData) => newData.pass1 === newData.pass2 || 'passwords don't match'`],
    },
    columnCount: {
      category: 'style',
      type: Number,
      default: 1,
      desc: `The amount of columns the form should have.\nEach field can set a specific 'span' to be able to span multiple columns.`,
    },
    gridGap: {
      category: 'style',
      type: String,
      default: '1em',
      desc: `The gap between each field in the form.`,
    },
    lang: {
      category: 'content',
      type: Object,
      desc: `The text used in the UI, eg. edit/save buttons etc... Pass an object with keys: archive, delete, cancel, edit, save.`,
      default: () => lang,
      examples: [`{cancel: 'キャンセル', edit: '編集', save: '保存'}`],
    },
    externalLabels: {
      category: 'style',
      type: Boolean,
      desc: `By default labels are external to allow similar label styling for any type of field.

When the fieldType is 'input' or 'select' and \`externalLabels: false\` it will use an internal label on 'input' fields and pass the subLabel as 'hint' underneath the input field.`,
      default: true,
    },
  },
  data () {
    const formMode = this.mode
    const formId = this.id
    const dataFlat = flattenPerSchema(this.value, this.schema)
    const formDataFlat = copy(dataFlat)
    return {
      formMode,
      formId,
      edited: false,
      editedFields: [],
      formDataFlat,
      formDataFlatBackups: [copy(dataFlat)],
    }
  },
  watch: {
    value (newValue) { this.formDataFlat = copy(newValue) },
    mode (newValue) { this.formMode = copy(newValue) },
    id (newValue) { this.formId = copy(newValue) },
  },
  computed: {
    l () { return this.lang },
    formDataNested () { return nestifyObject(this.formDataFlat) },
    schemaObject () {
      return this.schema.reduce((carry, blueprint) => {
        carry[blueprint.id] = blueprint
        return carry
      }, {})
    },
    cMode: {
      get () { return this.formMode },
      set (val) {
        this.formMode = val
        this.$emit('update:mode', val)
      },
    },
    cSchema () {
      const { cMode, schema, formDataNested, formDataFlat, externalLabels } = this
      const self = this
      function checkShowCondition ({ id: fieldId, showCondition }) {
        if (!isFunction(showCondition)) return true
        return showCondition(formDataFlat[fieldId], self)
      }
      return schema.reduce((carry, blueprint) => {
        // return early when showCondition fails
        if (cMode === 'view') {
          if (!checkShowCondition(blueprint)) return carry
          carry.push(merge(blueprint, {readonly: true}))
          return carry
        }
        if (!checkShowCondition(blueprint)) return carry
        carry.push(blueprint)
        return carry
      }, [])
    },
    dataBackup () {
      const { formDataFlatBackups } = this
      if (!formDataFlatBackups.length) return {}
      const lastBackup = formDataFlatBackups.slice(-1)[0]
      const dataNested = nestifyObject(lastBackup)
      return dataNested
    },
    dataEdited () {
      const { editedFields, formDataFlat } = this
      const dataFlat = editedFields.reduce((carry, prop) => {
        carry[prop] = formDataFlat[prop]
        return carry
      }, {})
      const dataNested = nestifyObject(dataFlat)
      return dataNested
    },
    validatorErrors () {
      const { cSchema, validator, dataEdited, dataBackup } = this
      const errors = []
      const requiredFieldsError = checkRequiredFields(
        merge(dataEdited),
        cSchema
      )
      if (isFullString(requiredFieldsError)) errors.push(requiredFieldsError)
      if (!isFunction(validator)) return errors
      const validatorRes = validator(dataEdited, dataBackup)
      if (isFullString(validatorRes)) errors.push(validatorRes)
      return errors
    },
    validatorMessage () {
      return this.validatorErrors.join('、\n')
    },
    validated () {
      const { validatorMessage, cMode, edited } = this
      const hasErrors = validatorMessage.length
      if (cMode === 'add') return !hasErrors
      return edited && !hasErrors
    },
  },
  methods: {
    isFullString,
    fieldInput ({id, value}) {
      // console.log('field id → ', id, '| new value → ', value)
      this.$emit('field-input', {id, value})
      const blueprint = this.schemaObject[id]
      if (blueprint && isFunction(blueprint.onInput)) {
        const formRef = this
        blueprint.onInput(value, formRef, this.$store)
      }
      this.edited = true
      if (!this.editedFields.includes(id)) this.editedFields.push(id)
      this.formDataFlat[id] = value
      this.$emit('input', this.formDataFlat)
    },
    resetState () {
      this.cMode = 'view'
      this.edited = false
      this.editedFields = []
      this.formDataFlatBackups.push(copy(this.formDataFlat))
    },
    restoreBackup () {
      if (!this.formDataFlatBackups.length) return
      const lastBackup = this.formDataFlatBackups.pop()
      this.formDataFlat = lastBackup
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
