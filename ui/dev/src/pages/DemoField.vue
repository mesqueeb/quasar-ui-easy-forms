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
      v-model="settings"
      :settingsSchema="settingsSchema"
      :fieldValue="model"
    />
  </q-page>
</template>

<style lang="sass" scoped>

</style>

<script>
import { isString, isBoolean } from 'is-what'
import copy from 'copy-anything'
import merge from 'merge-anything'
import EasyForms from 'ui'
import schema from '../schemas/index'

export default {
  name: 'PageDemoField',
  data () {
    const selectedField = 'input'
    const selectableFields = Object.values(schema).map(field => field.fieldType)
    const fieldPicker = {
      label: 'Pick a field',
      fieldType: 'dropdown',
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
      const { selectedField, componentSelectedFieldUpper } = this
      return schema[`efPreview${componentSelectedFieldUpper}`]
    },
    componentPropsInfo () {
      const { selectedField, componentSelectedFieldUpper } = this
      const EasyField = EasyForms['EasyField']
      const component = EasyForms[`Ef${componentSelectedFieldUpper}`]
      return merge(EasyField.props, component.props)
    },
    settingsSchema () {
      const { settings, componentPropsInfo, selectedField } = this
      const propsAsSettingsSchema = Object.entries(componentPropsInfo)
        .reduce((carry, [propKey, propInfo]) => {
          // fields to not include in the InfoCard settings:
          if (
            ['value', 'fieldType'].includes(propKey) ||
            (selectedField !== 'form' && ['schema', 'maxRows'].includes(propKey))
          ) {
            return carry
          }
          const { description, type, quasarProp } = propInfo
          carry[propKey] = {
            id: propKey,
            label: propKey,
            subLabel: description,
            fieldType: Boolean === type ? 'toggle' : 'input',
            quasarProp,
          }
          return carry
        }, {
          // default EfField props
          label: { id: 'label', label: 'label', fieldType: 'input' },
          subLabel: { id: 'subLabel', label: 'subLabel', fieldType: 'input' },
        })
      const settingsCleaned = propsAsSettingsSchema
      // const settingsCleaned = Object.entries(settings)
      //   .reduce((carry, [key, value]) => {
      //     if (key === 'fieldType') return carry
      //     const fieldType = isBoolean(value) ? 'toggle' : 'input'
      //     carry[key] = {
      //       id: key,
      //       label: key,
      //       fieldType,
      //     }
      //     return carry
      //   }, {})
      const settingsOrder = ['label', 'subLabel']
      const settingsArrayTop = settingsOrder
        .map(id => settingsCleaned[id])
      const settingsArrayBottom = Object.values(settingsCleaned)
        .filter(s => !settingsOrder.includes(s.id))
      return [
        ...settingsArrayTop,
        ...settingsArrayBottom,
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
  },
}
</script>
