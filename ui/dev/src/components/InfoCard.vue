<template>
  <q-card>
    <q-tabs
      v-model="tabControl"
      dense
      class="text-grey"
      active-color="primary"
      indicator-color="primary"
      align="justify"
      narrow-indicator
    >
      <q-tab name="settings" label="Settings" />
      <q-tab name="source" label="View source" />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="tabControl" animated>
      <q-tab-panel name="settings">
        <!-- <Settings :settings="settings" /> -->
        <EasyForm
          style="grid-gap: 1em"
          @field-input="fieldInput"
          :action-buttons="[]"
          :columnCount="2"
          mode="edit"
          :schema="settingsSchema"
          :data="settings"
        />
      </q-tab-panel>
      <q-tab-panel name="source">
        {{ settings }}
        <!-- <Source :settings="settings" /> -->
      </q-tab-panel>
    </q-tab-panels>
  </q-card>
</template>

<script>
import merge from 'merge-anything'
import copy from 'copy-anything'

export default {
  name: 'InfoCard',
  props: {
    value: Object,
    settingsSchema: Array,
    fieldValue: undefined, // any
  },
  data () {
    return {
      tabControl: 'settings',
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
  methods: {
    fieldInput ({id, value}) {
      const settings = copy(this.settings)
      settings[id] = value
      this.$emit('input', settings)
    }
  },
}
</script>
