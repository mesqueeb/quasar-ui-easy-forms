<template>
  <q-card>
    <div v-if="!!$slots.default" class="q-pa-md">
      <slot />
    </div>
    <q-separator v-if="!!$slots.default" />

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
      <q-tab
        v-for="tab in tabs"
        :key="tab"
        :name="tab"
        :label="tab"
      />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="tabControl" animated>
      <q-tab-panel :name="tabs[0]" class="q-pa-none">
        <SourceTab
          :tag="tag"
          :settings="settings"
          :settingsSchema="settingsSchema"
        />
      </q-tab-panel>
      <q-tab-panel :name="tabs[1]" class="q-pa-none">
        <PropTabsPanel
          :tag="tag"
          :value="settings"
          @input="val => $emit('input', val)"
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
      tabControl: 'Source code',
      tabs: [
        'Source code',
        'Update props',
      ],
    }
  },
  computed: {
    settings () {
      return copy(this.value)
    },
  },
  methods: {},
}
</script>
