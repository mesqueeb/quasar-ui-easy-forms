<template>
  <q-card class="info-card">
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
      <q-tab-panel
        v-for="tab in tabs"
        :key="tab"
        :name="tab"
        class="q-pa-none"
      >
        <TabsPanelSource
          v-if="tab === 'Source code'"
          :tag="tag"
          :settings="settings"
          :settingsSchema="settingsSchema"
        />
        <TabsPanelProps
          v-if="tab === 'Modify props'"
          :tag="tag"
          :value="settings"
          @input="val => $emit('input', val)"
          :settingsSchema="settingsSchema"
        />
        <TabsPanelCss
          v-if="tab === 'Modify css'"
          :defaultClasses="TabsPanelCssClasses"
          :defaultStyle="TabsPanelCssStyle"
          targetWrapperElementSelector=".js-interactive-preview"
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
        'Modify props',
        'Modify css',
      ],
    }
  },
  computed: {
    settings () {
      return copy(this.value)
    },
    TabsPanelCssClasses () {
      const { tag, settings } = this
      const classesEasyField = [
        '.easy-field',
        '.easy-field__label',
        '.easy-field__sub-label',
        '.easy-field__field',
      ]
      if (tag === 'EasyField') {
        classesEasyField.splice(1, 0, `.easy-field--${settings.fieldType}`)
        return classesEasyField
      }
      return [
        '.easy-form',
        '.easy-form__nav-row',
        '.easy-form__validation-error',
        '.easy-form__form',
      ].concat(classesEasyField)
    },
    TabsPanelCssStyle () {
      return {
        '.easy-form': {padding: '1em'},
        '.easy-field': {padding: '1em'},
      }
    },
  },
  methods: {},
}
</script>
