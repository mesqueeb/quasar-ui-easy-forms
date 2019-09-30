<template>
  <q-page padding>
    <div class="q-gutter-md q-pb-md column items-start">
      <div class="flex">
        <EasyField v-model="selectedField" v-bind="fieldPicker" />
      </div>
      <q-badge color="primary">{{ modelShownAsBadge }}</q-badge>
      <EasyField
        v-model="model"
        v-bind="field"
        style="width: 95%"
      />
      <div>
        {{ component.description }}
      </div>
      <q-markdown
        v-if="component.description"
      >
        {{ component.description }}
      </q-markdown>
    </div>
    <InfoCard
      :key="selectedField"
      v-model="settings"
      :settingsSchemaEf="settingsSchemaEf"
      :settingsSchemaQuasar="settingsSchemaQuasar"
      :selectedField="selectedField"
      :settingsMetaData="settingsMetaData"
      :fieldValue="model"
    />
  </q-page>
</template>

<style lang="sass" scoped>

</style>

<script>
import { isString, isBoolean, isUndefined, isArray, isFunction, isPlainObject, isFullString } from 'is-what'
import copy from 'copy-anything'
import merge from 'merge-anything'
import EasyForms from 'ui'
import demoOptions from '../schemas/index'

function stringToJs (string) {
  if (!string) return undefined
  const jsonString = string
    .replace(/([a-zA-Z0-9]+?):/g, '"$1":')
    .replace(/'/g, '"')
  let parsed
  try {
    parsed = JSON.parse(jsonString)
  } catch (e) {
    return string
  }
  return parsed
}

const selectableFields = require
  .context('../../../src/components/fields', true, /^\.\/.*\.vue$/)
  .keys()
  .map(k => {
    const name = k.replace(/\.\/Ef/, '').replace(/\.vue/, '')
    return name[0].toLowerCase() + name.slice(1)
  })
  .sort()

export default {
  name: 'PageDemoField',
  data () {
    const selectedField = 'input'
    const fieldPicker = {
      label: 'Pick a field',
      fieldType: 'select',
      options: selectableFields,
    }
    return {
      selectedField,
      selectableFields,
      fieldPicker,
      model: '',
      settings: {},
    }
  },
  watch: {
    selectedField: {
      handler (newValue, oldValue) {
        const { componentDemoFieldSettings, addTestOptions } = this
        this.model = undefined
        if (newValue === oldValue) return
        addTestOptions()
        this.settings.label = `My awesome "${newValue}" field`
      },
      immediate: true,
    },
  },
  computed: {
    field () {
      return this.settings
    },
    componentSelectedFieldUpper () {
      const { selectedField } = this
      console.log('selectedField → ', selectedField)
      return selectedField[0].toUpperCase() + selectedField.slice(1)
    },
    component () {
      const { selectedField, componentSelectedFieldUpper } = this
      return EasyForms[`Ef${componentSelectedFieldUpper}`] || {}
    },
    componentPropsInfo () {
      const { selectedField, component } = this
      const EasyField = EasyForms['EasyField']
      let componentProps = component.props || {}
      if (selectedField === 'inputDate') {
        const subComponent = EasyForms['EfInput']
        componentProps = merge(subComponent.props, componentProps)
      }
      console.log('EasyField.props → ', copy(EasyField.props))
      console.log('componentProps → ', copy(componentProps))
      return copy(merge(EasyField.props, componentProps)) || {}
    },
    settingsMetaData () {
      const { settings, componentPropsInfo, selectedField } = this
      return Object.entries(componentPropsInfo)
        .reduce((carry, [propKey, propInfo]) => {
          // fields to not include in the InfoCard settings:
          if (
            ['value', 'fieldType'].includes(propKey)
          ) {
            return carry
          }
          const { description, type, quasarProp, examples, default: _df, values } = propInfo
          // make the raw prop info from the components into an EasyForm:
          let subLabel = quasarProp && !isUndefined(_df) && isUndefined(description)
            ? `Same as Quasar, but defaults to: ${_df}`
            : description
          let options, outlined, standout, disable, parseInput, format, autogrow
          let fieldType = 'input'
          if (type === Boolean) fieldType = 'toggle'
          const propHasValues = isArray(values) && values.length
          if (propHasValues) {
            fieldType = 'select'
            options = values.map(v => ({label: v, value: v}))
          }
          if (
            type === Array ||
            type === Object ||
            (isArray(type) && [Array, Object].some(t => type.includes(t)) && type.length === 2)
          ) {
            outlined = false
            standout = true
            parseInput = stringToJs
            format = JSON.stringify
            autogrow = true
          }
          if (propKey === 'schema') subLabel += `\nEg.\n${examples.join(', ')}`
          if (type === Function) {
            disable = true
          }
          carry[propKey] = {
            id: propKey,
            fieldType,
            valueType: type === Number ? 'number' : undefined,
            // schema,
            label: propKey,
            subLabel,
            placeholder: !isArray(examples) ? '' : examples.join(', '),
            quasarProp,
            options,
            outlined,
            standout,
            disable,
            parseInput,
            format,
            autogrow,
          }
          return carry
        }, {})
    },
    settingsSchema () {
      const { settingsMetaData } = this
      const settingsOrder = ['label', 'subLabel', 'valueType', 'schema']
      const settingsArrayTop = settingsOrder
        .map(id => settingsMetaData[id]).filter(s => s)
      const settingsArrayBottom = Object.values(settingsMetaData)
        .filter(s => !settingsOrder.includes(s.id))
      return [
        ...settingsArrayTop,
        ...settingsArrayBottom,
      ]
    },
    settingsSchemaEf () {
      return this.settingsSchema.filter(s => !s.quasarProp)
    },
    settingsSchemaQuasar () {
      return [
        {label: 'Quasar props with modified behaviour', fieldType: 'title'},
        ...this.settingsSchema.filter(s => s.quasarProp)
      ]
    },
    modelShownAsBadge () {
      const { model } = this
      const parsedModel = isString(model)
        ? `"${model}"`
        : (isArray(model) || isPlainObject(model))
          ? JSON.stringify(model)
          : model
      return `v-model: ${parsedModel}`
    },
    demoOptions () {
      const { selectedField } = this
      return demoOptions[selectedField]
    },
  },
  methods: {
    addTestOptions () {
      const { demoOptions, updateAllSettings } = this
      const ops = copy(demoOptions)
      if (!ops) return
      const { value } = ops
      if (value !== undefined) {
        this.model = value
        delete ops.value
      }
      updateAllSettings(ops)
    },
    log(...args) {
      console.log(...args)
    },
    updateAllSettings (newSettings = {}) {
      Object.entries(newSettings).forEach(([key, value]) => {
        this.$set(this.settings, key, value)
      })
    },
  },
}
</script>
