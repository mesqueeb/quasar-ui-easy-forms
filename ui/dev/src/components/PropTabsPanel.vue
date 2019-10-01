<template>
  <q-splitter
    v-model="splitterModel"
    style="height: 500px"
  >
    <template v-slot:before>
      <q-tabs
        v-model="tabControl"
        vertical
        class="text-teal"
      >
        <q-tab
          v-for="panel in Object.values(settingsSchemaPerCategory)"
          :name="panel.name"
          :label="panel.name"
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
          :name="panel.name"
        >
          <EasyForm
            grid-gap="0"
            @field-input="updateSettings"
            :action-buttons="[]"
            :columnCount="2"
            mode="edit"
            :schema="panel.schema"
            :data="settings"
          />
        </q-tab-panel>
      </q-tab-panels>
    </template>
  </q-splitter>
</template>

<script>
import { isArray } from 'is-what'
import merge from 'merge-anything'
import copy from 'copy-anything'

export default {
  name: 'PropTabsPanel',
  props: {
    value: Object,
    settingsSchema: Array,
  },
  data () {
    return {
      tabControl: '',
      splitterModel: 20,
    }
  },
  computed: {
    settingsSchemaPerCategory () {
      return this.settingsSchema.reduce((carry, blueprint) => {
        const { category } = blueprint
        if (!carry[category]) carry[category] = {schema: [], name: category}
        carry[category].schema.push(blueprint)
        return carry
      }, {})
    },
  },
  methods: {
    updateSettings ({id, value}) {
      const settings = copy(this.settings)
      settings[id] = value
      this.$emit('input', settings)
    },
  },
}
</script>
