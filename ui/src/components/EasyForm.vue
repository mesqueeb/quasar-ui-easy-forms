<template>
  <q-form
    ref="refEasyForm"
    class="easy-form q-gutter-lg"
    :style="{flexDirection: ['top', 'bottom'].includes(actionButtonsPosition) ? 'column' : 'row'}"
  >
    <div
      class="easy-form__nav-row"
      :style="{
        order: ['top', 'left'].includes(actionButtonsPosition) ? 0 : 1,
        gridAutoFlow: ['top', 'bottom'].includes(actionButtonsPosition) ? 'column' : 'row',
      }"
      v-if="isFullString(errorMsg) || cActionButtons.length"
    >
      <div
        class="easy-form__validation-error text-negative"
        v-if="isFullString(errorMsg)"
      >{{ errorMsg }}</div>
      <EfBtn
        v-for="btn in cActionButtons"
        :key="btn.label"
        :value="btn.label"
        :size="btn.size || 'md'"
        :push="btn.push"
        :flat="btn.flat"
        :color="btn.color || 'primary'"
        @click="e => tapCustomBtn(e, btn.handler)"
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
        :value="formDataFlat[field.id]"
        @input="value => fieldInput({id: field.id, value})"
        :class="field.fieldType === 'title' ? '-title' : ''"
        :style="field.span ? `grid-column: ${field.span === true ? '1 / -1' : `span ${field.span}`}` : ''"
      />
    </div>
  </q-form>
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
import { QForm } from 'quasar'
import merge from 'merge-anything'
import copy from 'copy-anything'
import { isArray, isFunction, isFullString, isString } from 'is-what'
import { nestifyObject } from 'nestify-anything'
import flattenPerSchema from '../helpers/flattenPerSchema'
import defaultLang from '../meta/lang'
import EfBtn from './fields/EfBtn.vue'
import EasyField from './EasyField.vue'

export default {
  name: 'EasyForm',
  components: { EfBtn, EasyField, QForm },
  inheritAttrs: false,
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
      desc: `A manually set 'id' of the EasyForm. This prop is accessible in the \`context\` (as \`formId\`) of any "evaluated prop" and event*.

Read more on Evaluated Props in its dedicated page.`,
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
      default: () => defaultLang,
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
    const { mode, id, value, schema, lang } = this
    // merge user provided lang onto defaults
    const innerLang = merge(defaultLang, lang)
    const formMode = mode
    const formId = id
    const dataFlat = flattenPerSchema(value, schema)
    const schemaArray = isArray(schema) ? schema : Object.values(schema)
    const initialDataFlat = schemaArray.reduce((carry, blueprint) => {
      carry[blueprint.id] = blueprint.default
      return carry
    }, {})
    const formDataFlat = merge(initialDataFlat, copy(dataFlat))
    return {
      innerLang,
      formMode,
      formId,
      edited: false,
      editedFields: [],
      formDataFlat,
      formDataFlatBackups: [copy(formDataFlat)],
      errorMsg: '',
    }
  },
  watch: {
    value (newValue) { this.formDataFlat = newValue },
    mode (newValue) { this.formMode = newValue },
    id (newValue) { this.formId = newValue },
    lang (newValue) { this.innerLang = merge(defaultLang, newValue) },
  },
  computed: {
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
      const {
        schema,
        formDataNested,
        formDataFlat,
        formMode,
        formId,
        externalLabels,
        innerLang,
        fieldInput,
      } = this
      const self = this
      function checkShowCondition ({ id: fieldId, showCondition }) {
        if (!isFunction(showCondition)) return true
        return showCondition(formDataFlat[fieldId], self)
      }
      return schema.reduce((carry, blueprint) => {
        blueprint = merge(blueprint, {
          formDataNested,
          formDataFlat,
          formMode,
          formId,
          externalLabels,
          lang: innerLang,
          fieldInput,
        })
        // return early when showCondition fails
        if (formMode === 'view') {
          if (!checkShowCondition(blueprint)) return carry
          carry.push(merge(blueprint, {readonly: true}))
          return carry
        }
        if (!checkShowCondition(blueprint)) return carry
        carry.push(blueprint)
        return carry
      }, [])
    },
    cActionButtons () {
      const { actionButtons, innerLang, cMode, tapDelete, tapArchive, tapCancel, tapSave } = this
      return actionButtons.map(btn => {
        if (btn === 'delete') {
          return {label: innerLang['delete'], flat: true, color: 'negative', handler: tapDelete}
        }
        if (btn === 'archive') {
          return {label: innerLang['archive'], flat: true, color: 'negative', handler: tapArchive}
        }
        if (btn === 'cancel' && (cMode === 'edit' || cMode === 'add')) {
          return {label: innerLang['cancel'], flat: true, handler: tapCancel}
        }
        if (btn === 'edit' && (cMode === 'view')) {
          return {label: innerLang['edit'], push: true, handler: () => {this.cMode = 'edit'}}
        }
        if (btn === 'save' && (cMode === 'edit' || cMode === 'add')) {
          return {label: innerLang['save'], push: true, handler: tapSave}
        }
        return btn
      }).filter(btn => !isString(btn))
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
  },
  methods: {
    isFullString,
    fieldInput ({id, value}) {
      this.edited = true
      if (!this.editedFields.includes(id)) this.editedFields.push(id)
      this.formDataFlat[id] = value
      this.$emit('field-input', {id, value})
      this.$emit('input', this.formDataFlat)
    },
    resetState () {
      this.cMode = 'view'
      this.edited = false
      this.editedFields = []
      this.formDataFlatBackups.push(copy(this.formDataFlat))
      this.errorMsg = ''
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
    validate () {
      const { $refs, innerLang, validator, dataEdited, dataBackup } = this
      return new Promise((resolve, reject) => {
        if (isFunction(validator)) {
          const validatorRes = validator(dataEdited, dataBackup)
          if (isFullString(validatorRes)) reject(validatorRes)
        }
        $refs.refEasyForm.validate().then(success => {
          if (success) return resolve()
          reject(innerLang['formValidationError'])
        })
      })
    },
    tapSave () {
      const { validate, dataEdited, dataBackup, resetState } = this
      validate().then(() => {
        const newData = copy(dataEdited)
        const oldData = copy(dataBackup)
        this.$emit('save', {newData, oldData})
        resetState()
      }).catch(errorMsg => {
        this.errorMsg = errorMsg
      })
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
