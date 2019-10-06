<template>
  <q-card>
    <div class="q-pa-md">
      <slot />
    </div>

    <q-separator />

    <q-tabs
      v-model="tabControl"
      dense
      style="background: whitesmoke"
      class="text-grey"
      active-color="primary"
      indicator-color="primary"
      align="justify"
      narrow-indicator
      no-caps
    >
      <q-tab name="Props" label="Props" />
      <q-tab name="Source" label="Source" />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="tabControl" animated>
      <q-tab-panel name="Props" class="q-pa-none">
        <PropTabsPanel
          :tag="tag"
          :value="settings"
          @input="val => $emit('input', val)"
          :settingsSchema="settingsSchema"
        />
      </q-tab-panel>
      <q-tab-panel name="Source" class="q-pa-none">
        <SourceTab
          :tag="tag"
          :settings="settings"
          :settingsSchema="settingsSchema"
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
    tag: {
      type: String,
      validator: prop => ['EasyField', 'EasyForm'].includes(prop),
      values: ['EasyField', 'EasyForm'],
      examples: [`'EasyField'`, `'EasyForm'`],
    },
    value: Object, // settings data object
    settingsSchema: {type: [Array, Object], default: () => []},
  },
  data () {
    return {
      tabControl: 'Props',
    }
  },
  computed: {
    settings () {
      const settings = copy(this.value)
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
