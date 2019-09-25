<template>
  <q-page padding>
    <div class="q-gutter-md q-pb-md column items-start">
      <EasyField v-model="selectedField" v-bind="fieldPicker" />
      <q-badge color="primary">{{ modelShownAsBadge }}</q-badge>
      <EasyField
        v-model="model"
        v-bind="field"
        style="align-self: stretch"
      />
    </div>
    <InfoCard
      :key="selectedField"
      v-model="settings"
      :settingsSchemaEf="settingsSchemaEf"
      :settingsSchemaQuasar="settingsSchemaQuasar"
      :selectedField="selectedField"
      :settingsMetaData="settingsMetaData"
      :fieldValue="model"
      @update-all-settings="updateAllSettings"
    />
  </q-page>
</template>

<style lang="sass" scoped>

</style>

<script>
import { isString, isBoolean, isUndefined, isArray, isFunction } from 'is-what'
import copy from 'copy-anything'
import merge from 'merge-anything'
import EasyForms from 'ui'

const selectableFields = require.context('../../../src/components/fields', true, /^\.\/.*\.vue$/)
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
      settings: {
        disable: false,
      },
    }
  },
  watch: {
    selectedField: {
      handler (newValue, oldValue) {
        const { componentDemoFieldSettings } = this
        if (newValue === oldValue) return
        this.settings = copy(componentDemoFieldSettings)
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
      return selectedField[0].toUpperCase() + selectedField.slice(1)
    },
    componentDemoFieldSettings () {
      const { selectedField, componentSelectedFieldUpper, componentPropsInfo } = this
      const componentPropDefaults = Object.entries(componentPropsInfo)
        .reduce((carry, [propKey, propInfo]) => {
          carry[propKey] = isFunction(propInfo.default) ? propInfo.default() : propInfo.default
          return carry
        }, {})
      return copy(merge(componentPropDefaults, {fieldType: selectedField})) || {}
    },
    componentPropsInfo () {
      const { selectedField, componentSelectedFieldUpper } = this
      const EasyField = EasyForms['EasyField']
      const component = EasyForms[`Ef${componentSelectedFieldUpper}`] || {}
      console.log('component !!! → ', component)
      let componentProps = component.props || {}
      if (selectedField === 'inputDate') {
        const subComponent = EasyForms['EfInput']
        componentProps = merge(subComponent.props, componentProps)
      }
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
          const { description, type, quasarProp, examples, default: _df } = propInfo
          // make the raw prop info from the components into an EasyForm:
          const subLabel = quasarProp && !isUndefined(_df) && isUndefined(description)
            ? `Same as Quasar, but defaults to: ${_df}`
            : description
          carry[propKey] = {
            id: propKey,
            label: propKey,
            subLabel,
            fieldType: type === Boolean ? 'toggle' : type === Array ? 'form' : 'input',
            valueType: type === Number ? 'number' : undefined,
            placeholder: !isArray(examples) ? '' : examples.join(', '),
            quasarProp,
          }
          return carry
        }, {})
    },
    settingsSchema () {
      const { settingsMetaData } = this
      const settingsOrder = ['label', 'subLabel', 'valueType']
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
      const model = (isString(this.model)) ? `"${this.model}"` : this.model
      return `v-model: ${model}`
    },
  },
  methods: {
    log(...args) {
      console.log(...args)
    },
    updateAllSettings (newSettings) {
      console.log('merge(this.settings, newSettings) → ', merge(this.settings, newSettings))

      this.settings = merge(this.settings, newSettings)
    },
  },
}
</script>
