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
  },
  computed: {
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
  },
}
</script>
