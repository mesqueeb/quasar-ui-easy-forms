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
          v-for="panel in Object.values(schemaPerCategory)"
          :key="panel.name"
          :name="panel.name"
        >
          <div class="row no-wrap items-center justify-between full-width">
            <span class="q-mr-xs text-weight-medium">{{ pascalCase(panel.name) }}</span>
            <q-badge>{{ panel.schema.length }}</q-badge>
          </div>
        </q-tab>
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
          v-for="panel in Object.values(schemaPerCategory)"
          :key="panel.name"
          :name="panel.name"
          class="q-pa-none q-pt-md"
        >
          <div
            v-if="panel.schema.find(blueprint => blueprint.inheritedProp)"
            class="q-pa-md flex flex-center q-gutter-md"
          >
            <div class="flex">
              <div class="_box" style="background: white"></div>
              <div class="_legend q-pl-xs">EasyField prop</div>
            </div>
            <div class="flex">
              <div class="_box inherited-prop-modified"></div>
              <div class="_legend q-pl-xs">inherited prop (from the wrapped component - with modified behavior)</div>
            </div>
            <div class="flex">
              <div class="_box inherited-prop"></div>
              <div class="_legend q-pl-xs">inherited prop (from the wrapped component)</div>
            </div>
          </div>
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
  .inherited-prop
    background: whitesmoke
  .inherited-prop-modified
    background: lavender
  .q-tab__content
    width: 100%
  ._box
    border: thin solid lightgrey
    width: 30px
    height: 20px
  .easy-field
    grid-template-areas: "label sub-label" "label field"
    grid-template-columns: 150px 1fr
    grid-gap: 6px
    padding: 1em
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
    value: Object,
    propsSchema: [Array, Object],
  },
  data () {
    return {
      tabControl: 'model',
      splitterModel: 15,
    }
  },
  computed: {
    schemaPerCategory () {
      const { propsSchema } = this
      const schema = (!isArray(propsSchema)) ? Object.values(propsSchema) : propsSchema
      const perCat = schema.reduce((carry, blueprint) => {
        const { category, inheritedProp, fieldClasses } = blueprint
        // If it's an inheritedProp, add a specific indentifier
        if (inheritedProp) {
          fieldClasses.push(inheritedProp === true ? 'inherited-prop' : 'inherited-prop-modified')
        }
        if (!category) return carry
        const categoryArray = category.split('|')
        categoryArray.forEach(c => {
          if (!carry[c]) carry[c] = {schema: [], name: c}
          blueprint.sortFieldsOnInheritedOrNot = (inheritedProp === undefined)
            ? '_'
            : inheritedProp
          carry[c].schema.push(blueprint)
        })
        return carry
      }, {})
      Object.entries(perCat).forEach(([catKey, {schema}]) => {
        perCat[catKey].schema = sort(schema).by('sortFieldsOnInheritedOrNot')
      })
      return perCat
    },
  },
  methods: {
    pascalCase,
    updateSettings ({id, value}) {
      const settings = copy(this.value)
      settings[id] = value
      this.$emit('input', settings)
    },
  },
}
</script>
