<template>
  <q-page padding>
    <div class="row no-wrap items-start q-gutter-md q-mb-lg">
      <EasyField v-model="selectedField" v-bind="fieldPicker" />
      <InfoBoxWrapper color="primary" label="v-model" style="flex: 2;">
        <q-markdown
          v-if="selectedField !== 'markdown'"
          class="q-py-md q-px-sm"
          :src="modelShownAsBadge"
        />
        <!-- display: inline -->
        <div
          v-else
          class="q-ma-sm q-py-sm q-px-xs text-wrap-all bg-grey-2"
          style="width: 97%; border-radius: 0.3em"
          >{{ modelShownAsBadge }}</div
        >
      </InfoBoxWrapper>
    </div>
    <q-markdown v-if="rawComponent.desc" :src="rawComponent.desc" />
    <InfoCard
      tag-name="EasyField"
      :key="selectedField"
      :title="infoCardTitle"
      :prop-data.sync="propData"
      :props-schema="propsSchema"
      :style-classes="styleClasses"
      :style-classes-data="styleClassesData"
      :props-separate-tab="[]"
    >
      <EasyField v-model="model" v-bind="field" :key="selectedField" />
    </InfoCard>
  </q-page>
</template>

<style lang="sass"></style>

<script>
import { isString, isUndefined, isArray, isPlainObject } from 'is-what'
import { capitalCase } from 'case-anything'
import copy from 'copy-anything'
import merge from 'merge-anything'
import EasyForms from 'ui'
import demoOptions from '../schemas/examples/easyFields'
import { getInfoCardPropsSchema, getRawComponent } from '../helpers/schemaBuilders'

const selectableFields = require
  .context('../../../src/components/fields', true, /^\.\/.*\.vue$/)
  .keys()
  .map(k => k.replace(/(\.vue|\.\/)/g, ''))
  .sort()

export default {
  name: 'EasyFieldDemo',
  data () {
    const selectedField = 'EfInput'
    const fieldPicker = {
      label: 'Pick a field',
      component: 'EfSelect',
      emitValue: true,
      options: selectableFields,
    }
    return {
      selectedField,
      selectableFields,
      fieldPicker,
      model: '',
      propData: {},
    }
  },
  watch: {
    model (newValue, oldValue) {
      if (isUndefined(this.propData.value)) return
      this.propData.value = newValue
    },
    propData (newSettings, oldSettings) {
      if (!newSettings.value || newSettings.value === oldSettings.value) return
      this.model = newSettings.value
    },
    selectedField: {
      handler (newValue, oldValue) {
        const { addTestOptions } = this
        this.model = undefined
        this.propData.valueType = undefined
        if (newValue === oldValue) return
        const ops = copy(demoOptions[newValue])
        addTestOptions(ops)
        this.propData.label = `My awesome "${newValue}" field`
      },
      immediate: true,
    },
  },
  computed: {
    field () {
      return this.propData
    },
    infoCardTitle () {
      return capitalCase(this.selectedField)
    },
    rawComponent () {
      return getRawComponent(this.selectedField)
    },
    propsSchema () {
      return getInfoCardPropsSchema(this.selectedField)
    },
    modelShownAsBadge () {
      const { model } = this
      const parsedModel = isString(model)
        ? `"${model}"`
        : isArray(model) || isPlainObject(model)
        ? JSON.stringify(model)
        : model
      return `\`${parsedModel}\``
    },
    styleClasses () {
      const classesEasyField = [
        '.easy-field',
        `.easy-field--${this.selectedField}`,
        '.easy-field__label',
        '.easy-field__sub-label',
        '.easy-field__field',
      ]
      return classesEasyField
    },
    styleClassesData () {
      return {
        '.easy-field': { padding: '1em' },
      }
    },
  },
  methods: {
    addTestOptions (ops = {}) {
      if (!ops) return
      const { value } = ops
      if (value !== undefined) {
        this.model = value
      }
      this.propData = { value }
      Object.entries(ops).forEach(([key, value]) => {
        this.$set(this.propData, key, value)
      })
    },
    log (...args) {
      console.log(...args)
    },
  },
}
</script>
