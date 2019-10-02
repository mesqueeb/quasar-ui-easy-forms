<template>
  <q-card>
    <div class="pa-md">
      <slot />
    </div>

    <q-separator />

    <q-tabs
      v-model="tabControl"
      dense
      class="text-grey"
      active-color="primary"
      indicator-color="primary"
      align="justify"
      narrow-indicator
      no-caps
    >
      <q-tab name="Props" label="Props" />
      <q-tab name="Source" label="View source" />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="tabControl" animated>
      <q-tab-panel name="Props" class="pa-none">
        <PropTabsPanel
          :value="settings"
          @input="val => $emit('input', val)"
          :settingsSchema="settingsSchema"
        />
      </q-tab-panel>
      <q-tab-panel name="Source">
        <SourceTab
          :settings="settings"
          :settingsMetaData="settingsMetaData"
        />
      </q-tab-panel>
    </q-tab-panels>
  </q-card>
</template>

<script>
import { isArray } from 'is-what'
import merge from 'merge-anything'
import copy from 'copy-anything'

export default {
  name: 'InfoCard',
  props: {
    value: Object,
    settingsSchema: {type: Array, default: () => []},
    selectedField: String,
    settingsMetaData: Object,
    fieldValue: undefined, // any
  },
  data () {
    return {
      tabControl: 'Props',
    }
  },
  computed: {
    settings () {
      const settings = copy(this.value)
      delete settings.id
      const cleanSettings = merge({
        // default global easyField settings
        label: `My awesome "${settings.fieldType}" field`,
        subLabel: '',
        disable: false,
        readonly: false,
      }, settings)
      return cleanSettings
    },
  },
  methods: {},
}
</script>
