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
      <q-markdown v-if="rawComponent.desc">{{
        rawComponent.desc
      }}</q-markdown>
    </div>
    <InfoCard
      :key="selectedField"
      v-model="settings"
      :settingsSchema="settingsSchema"
      :selectedField="selectedField"
      :settingsMetaData="settingsMetaData"
      :fieldValue="model"
    />
  </q-page>
</template>

<style lang="sass" scoped>

</style>

<script>
import { isString, isUndefined, isArray, isPlainObject } from 'is-what'
import copy from 'copy-anything'
import merge from 'merge-anything'
import EasyForms from 'ui'
import demoOptions from '../schemas/index'
import { getInfoCardSchema, getRawComponent } from '../helpers/schemaBuilders'

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
    model (newValue, oldValue) {
      if (isUndefined(this.settings.value)) return
      this.settings.value = newValue
    },
    settings (newSettings, oldSettings) {
      if (!newSettings.value || newSettings.value === oldSettings.value) return
      this.model = newSettings.value
    },
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
    rawComponent () { return getRawComponent(this.selectedField) },
    settingsMetaData () { return getInfoCardSchema(this.selectedField) },
    settingsSchema () {
      const { settingsMetaData } = this
      const settingsOrder = ['value', 'label', 'subLabel', 'valueType', 'schema']
      const settingsArrayTop = settingsOrder
        .map(id => settingsMetaData[id]).filter(s => s)
      const settingsArrayBottom = Object.values(settingsMetaData)
        .filter(s => !settingsOrder.includes(s.id))
      return [
        ...settingsArrayTop,
        ...settingsArrayBottom,
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
