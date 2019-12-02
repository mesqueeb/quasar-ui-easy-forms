<template>
  <q-splitter
    v-model="splitterModel"
    style="height: 400px"
    class="tabs-panel-props"
  >
    <template v-slot:before>
      <q-tabs
        v-model="tabControl"
        vertical
        style="background: whitesmoke"
        class="text-grey full-height"
        active-color="primary"
        indicator-color="primary"
        no-caps
      >
        <q-tab
          v-for="panel in Object.values(settingsSchemaPerCategory)"
          :key="panel.name"
          :name="panel.name"
          :label="panel.name[0].toUpperCase() + panel.name.slice(1)"
          class="tabs-panel-props__left-tab"
        />
      </q-tabs>
    </template>

    <template v-slot:after>
      <q-tab-panels
        v-model="tabControl"
        animated
        transition-prev="slide-down"
        transition-next="slide-up"
      >
        <q-tab-panel
          v-for="panel in Object.values(settingsSchemaPerCategory)"
          :key="panel.name"
          :name="panel.name"
          class="q-pa-none q-pt-md"
        >
          <div
            v-if="tag === 'EasyField' && panel.name !== 'easyFormProp'"
            class="q-pa-md flex flex-center q-gutter-md"
          >
            <div class="flex">
              <div class="_box" style="background: white"></div>
              <div class="_legend q-pl-xs">EasyField prop</div>
            </div>
            <div class="flex">
              <div class="_box" style="background: lavender"></div>
              <div class="_legend q-pl-xs">Quasar prop (with modified behavior)</div>
            </div>
            <div class="flex">
              <div class="_box" style="background: whitesmoke"></div>
              <div class="_legend q-pl-xs">Quasar prop (regular)</div>
            </div>
          </div>
          <q-markdown
            v-if="tag === 'EasyField' && panel.name === 'easyFormProp'"
            class="q-pa-md"
          >These props are accessible in the `context` of the Function of any Evaluated Prop.
When using EasyField as standalone these props don't exist, but you can still pass them manually if you want to use them in Evaluated Props.
Read more on Evaluated Props on its dedicade page.</q-markdown>
          <EasyForm
            :value="value"
            @field-input="updateSettings"
            grid-gap="0"
            :action-buttons="[]"
            :column-count="1"
            mode="edit"
            :schema="panel.schema"
            class="q-pb-lg"
          />
        </q-tab-panel>
      </q-tab-panels>
    </template>
  </q-splitter>
</template>

<style lang="sass">

.tabs-panel-props
  ._box
    border: thin solid lightgrey
    width: 30px
    height: 20px
  .easy-field
    grid-template-areas: "label sub-label" "label field"
    grid-template-columns: 150px 1fr
    grid-gap: 6px
  .easy-field__label
    background: $accent
    color: white
    justify-self: start
    align-self: start
    padding: 1px 4px
    border-radius: 4px
    margin-bottom: 4px
  .q-markdown p
    margin: 0 !important

</style>

<script>
import { isArray } from 'is-what'
import merge from 'merge-anything'
import copy from 'copy-anything'
import sort from 'sort-anything'
import { pascalCase } from 'case-anything'

export default {
  name: pascalCase('tabs-panel-props'),
  props: {
    tag: {
      type: String,
      validator: prop => ['EasyField', 'EasyForm'].includes(prop),
      values: ['EasyField', 'EasyForm'],
      examples: [`'EasyField'`, `'EasyForm'`],
    },
    value: Object,
    settingsSchema: [Array, Object],
  },
  data () {
    return {
      tabControl: 'model',
      splitterModel: 12,
    }
  },
  computed: {
    settingsSchemaPerCategory () {
      const { settingsSchema } = this
      const schema = (!isArray(settingsSchema)) ? Object.values(settingsSchema) : settingsSchema
      const perCat = schema.reduce((carry, blueprint) => {
        const { category, quasarProp } = blueprint
        if (!category) return carry
        const categoryArray = category.split('|')
        categoryArray.forEach(c => {
          if (!carry[c]) carry[c] = {schema: [], name: c}
          if (quasarProp === undefined) blueprint.quasarProp = '_'
          carry[c].schema.push(blueprint)
        })
        return carry
      }, {})
      Object.entries(perCat).forEach(([catKey, {schema}]) => {
        perCat[catKey].schema = sort(schema).by('quasarProp')
      })
      return perCat
    },
  },
  methods: {
    updateSettings ({id, value}) {
      const settings = copy(this.value)
      settings[id] = value
      this.$emit('input', settings)
    },
  },
}
</script>
