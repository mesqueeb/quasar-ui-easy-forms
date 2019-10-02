<template>
  <q-page padding>
    <div class="q-gutter-md q-pb-md column items-start">
      <div class="row no-wrap items-start">
        <EasyField v-model="selectedField" v-bind="fieldPicker" />
        <div class="pl-md" style="flex: 2">
          <q-badge color="primary">v-model:</q-badge>
          <q-markdown class="_model-md" :src="modelShownAsBadge" />
        </div>
        <q-markdown
          class="pl-md"
          style="flex: 1"
          v-if="rawComponent.desc"
          :src="rawComponent.desc"
        />
      </div>
      <EasyField
        v-model="model"
        v-bind="field"
        style="width: 95%"
      />
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

<style lang="stylus">

._model-md
  border thin solid $primary
  min-height 70px
  min-width 170px
  max-width 60vw
  margin-top -10px
  padding 1em
  .q-markdown--token
    white-space pre-line
    word-break break-word

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
        this.settings.valueType = undefined
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
      return `\`${parsedModel}\``
    },
  },
  methods: {
    addTestOptions () {
      const { selectedField, updateAllSettings } = this
      const ops = copy(demoOptions[selectedField])
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
