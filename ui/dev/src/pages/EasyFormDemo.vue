<template>
  <q-page padding>
    <EasyForm
      class="page-form"
      v-model="pageValue"
      v-bind="pageForm"
    />
    <InfoBoxWrapper color="primary" label="v-model" style="flex: 2;">
      <q-markdown class="q-py-md q-px-sm" :src="modelShownAsBadge" />
    </InfoBoxWrapper>
    <InfoCard
      class="q-mt-lg"
      tag="EasyForm"
      :title="infoCardTitle"
      v-model="exampleForms[pageValue.chosenExample]"
      :settingsSchema="settingsSchema"
    >
      <EasyForm
        :key="pageValue.chosenExample"
        v-model="exampleForms[pageValue.chosenExample].value"
        v-bind="exampleForms[pageValue.chosenExample]"
      />
    </InfoCard>
  </q-page>
</template>

<style lang="sass">

.page-form
  .ef-btn-toggle
    border: solid 2px $primary
    border-radius: 6px
  .q-markdown p
    margin: 0 !important
    margin-block-start: 0
    margin-block-end: 0
  .q-markdown--code
    margin: 0 !important
</style>

<script>
import { isString, isArray, isPlainObject } from 'is-what'
import { spaceCase, pascalCase } from 'case-anything'
import merge from 'merge-anything'
import * as demoSchemas from '../schemas/index'
import { getInfoCardSchema } from '../helpers/schemaBuilders'

export default {
  name: 'EasyFormDemo',
  props: {
    schemaId: String
  },
  data () {
    const { pageForm, exampleForms } = demoSchemas[this.schemaId]
    const settingsSchema = getInfoCardSchema('EasyForm')
    return {
      pageValue: { chosenExample: 0 },
      pageForm,
      exampleForms: exampleForms.map(f => merge({value: {}}, f)),
      settingsSchema,
    }
  },
  watch: {
    'pageValue.chosenExample' (newValue, oldValue) {
      if (newValue === oldValue) return
      this.$set(this.exampleForms[this.pageValue.chosenExample], 'value', {})
    },
  },
  computed: {
    infoCardTitle () {
      return spaceCase(pascalCase(this.schemaId))
    },
    modelShownAsBadge () {
      const { model } = this
      const { value } = this.exampleForms[this.pageValue.chosenExample]
      const parsedValue = isString(value)
        ? `"${value}"`
        : (isArray(value) || isPlainObject(value))
          ? JSON.stringify(value)
          : value
      return `\`${parsedValue}\``
    },
  },
  methods: {
    log (...args) {
      console.log(...args)
    },
  },
}
</script>
