<template>
  <q-card class="info-card" flat bordered>
    <q-toolbar>
      <InfoCardTitle v-if="title" :value="title" />
      <q-space />
      <q-btn dense flat round icon="code" class="q-mx-sm" @click="onClick('Source')">
        <q-tooltip>View Source</q-tooltip>
      </q-btn>
      <q-btn dense flat round label="Props" class="q-mx-sm" @click="onClick('Props')">
        <q-tooltip>View/Edit Props</q-tooltip>
      </q-btn>
    </q-toolbar>

    <q-separator />

    <q-slide-transition>
      <q-tab-panels v-show="isExpanded" v-model="navControl" animated>
        <q-tab-panel class="q-pa-none _source-code-panel" name="Source">
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
              class="q-pa-none _source-code-panel"
            >
              <TabsPanelSchema
                v-if="tab === 'Schema'"
                :tag="tag"
                :settings="settings"
                :value="settings"
                @input="val => $emit('input', val)"
                :settingsSchema="settingsSchema"
              />
              <TabsPanelTemplate
                v-if="tab === 'Template'"
                :tag="tag"
                :settings="settings"
                :value="settings"
                @input="val => $emit('input', val)"
                :settingsSchema="settingsSchema"
              />
              <TabsPanelScript
                v-if="tab === 'Script'"
                :tag="tag"
                :settings="settings"
                :value="settings"
                @input="val => $emit('input', val)"
                :settingsSchema="settingsSchema"
              />
              <TabsPanelStyle
                v-if="tab === 'Style'"
                :defaultClasses="TabsPanelStyleClasses"
                :defaultStyle="TabsPanelStyleStyle"
                targetWrapperElementSelector=".js-interactive-preview"
              />
            </q-tab-panel>
          </q-tab-panels>
          <q-separator />
        </q-tab-panel>
        <q-tab-panel class="q-pa-none _props-panel" name="Props">
          <TabsPanelProps
            :tag="tag"
            :settings="settings"
            :value="settings"
            @input="val => $emit('input', val)"
            :settingsSchema="settingsSchema"
          />
          <q-separator />
        </q-tab-panel>
      </q-tab-panels>
    </q-slide-transition>
    <div class="q-pa-md">
      <slot />
    </div>
  </q-card>
</template>

<style lang="sass">

.info-card
  ._source-code-panel
    .q-markdown pre
      margin-bottom: 0 !important

</style>

<script>
import { isArray } from 'is-what'
import merge from 'merge-anything'
import copy from 'copy-anything'
import InfoCardTitle from './InfoCardTitle.vue'
import TabsPanelSchema from './TabsPanelSchema.vue'
import TabsPanelTemplate from './TabsPanelTemplate.vue'
import TabsPanelScript from './TabsPanelScript.vue'
import TabsPanelStyle from './TabsPanelStyle.vue'
import TabsPanelProps from './TabsPanelProps.vue'

export default {
  name: 'InfoCard',
  components: {
    InfoCardTitle,
    TabsPanelSchema,
    TabsPanelTemplate,
    TabsPanelScript,
    TabsPanelStyle,
    TabsPanelProps,
  },
  props: {
    title: String,
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
      isExpanded: false,
      tabControl: 'Schema',
      navControl: 'Source',
      tabs: [
        'Schema',
        'Template',
        'Script',
        'Style',
      ],
    }
  },
  computed: {
    settings () {
      return copy(this.value)
    },
    TabsPanelStyleClasses () {
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
    TabsPanelStyleStyle () {
      return {
        '.easy-form': {padding: '1em'},
        '.easy-field': {padding: '1em'},
      }
    },
  },
  methods: {
    onClick (target) {
      if (this.isExpanded && target !== this.navControl) {
        this.navControl = target
        return
      }
      this.isExpanded = !this.isExpanded
      this.navControl = target
    },
  },
}
</script>
