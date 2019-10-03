<template>
  <div class="badge-wrapper">
    <q-badge :color="color">interactive preview:</q-badge>
    <slot />
  </div>
</template>

<style lang="stylus">

.badge-wrapper
  border thin solid $primary
  min-height 70px
  min-width 170px
  max-width 60vw
  margin-top -10px
  padding 1em
  .q-markdown--token
    white-space pre-line
    word-break break-word
._preview
  border thin solid alpha(#CE93D8, 0.7)
  margin-top -10px
  padding 1.3em
  padding-top 1.9em
  padding-bottom 1.6em
  margin-bottom 1.5em

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
