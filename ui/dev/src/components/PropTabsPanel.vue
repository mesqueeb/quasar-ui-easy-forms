<template>
  <q-splitter
    v-model="splitterModel"
    style="max-height: 400px"
    class="api-card"
  >
    <template v-slot:before>
      <q-tabs
        v-model="tabControl"
        vertical
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        no-caps
      >
        <q-tab
          v-for="panel in Object.values(settingsSchemaPerCategory)"
          :key="panel.name"
          :name="panel.name"
          :label="panel.name[0].toUpperCase() + panel.name.slice(1)"
          class="_left-tab"
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
        >
          <div class="pb-md flex flex-center">
            <div class="_box" style="background: white"></div>
            <div class="_legend pl-xs pr-md">EasyField prop</div>
            <div class="_box" style="background: lavender"></div>
            <div class="_legend pl-xs pr-md">Quasar prop (with modified behavior)</div>
            <div class="_box" style="background: whitesmoke"></div>
            <div class="_legend pl-xs pr-md">Quasar prop (regular)</div>
          </div>
          <EasyForm
            grid-gap="0"
            @field-input="updateSettings"
            :action-buttons="[]"
            :columnCount="2"
            mode="edit"
            :schema="panel.schema"
            :data="value"
          />
        </q-tab-panel>
      </q-tab-panels>
    </template>
  </q-splitter>
</template>

<style lang="stylus">

.api-card
  ._left-tab .q-tab__content
    width: 100%
    align-items: start
  ._box
    border thin solid lightgrey
    width 30px
    height 20px

</style>

<script>
import { isArray } from 'is-what'
import merge from 'merge-anything'
import copy from 'copy-anything'
import sort from 'sort-anything'

export default {
  name: 'PropTabsPanel',
  props: {
    value: Object,
    settingsSchema: Array,
  },
  data () {
    return {
      tabControl: 'model',
      splitterModel: 10,
    }
  },
  computed: {
    settingsSchemaPerCategory () {
      const perCat = this.settingsSchema.reduce((carry, blueprint) => {
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
