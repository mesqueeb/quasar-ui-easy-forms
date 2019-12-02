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
              <MarkdownCode
                v-if="tab === 'Schema' && !hideSchema"
                :src="propData.schema"
                :prefix="`const ${varNameSchema} = `"
              />
              <TabsPanelTemplate
                v-if="tab === 'Template'"
                :tag-name="tagName"
                :var-name-props="varNameProps"
                :var-name-value="varNameValue"
                :var-name-schema="varNameSchema"
                :prop-data-print-ready="propDataPrintReady"
              />
              <TabsPanelScript
                v-if="tab === 'Script'"
                :tag-name="tagName"
                :var-name-props="varNameProps"
                :var-name-value="varNameValue"
                :var-name-schema="varNameSchema"
                :prop-data-print-ready="propDataPrintReady"
                :value-print-ready="valuePrintReady"
              />
              <TabsPanelStyle
                v-if="tab === 'Style'"
                :classes="styleClasses"
                :classes-data="styleClassesData"
                target-wrapper-element-selector=".js-interactive-preview"
              />
            </q-tab-panel>
          </q-tab-panels>
          <q-separator />
        </q-tab-panel>
        <q-tab-panel class="q-pa-none _props-panel" name="Props">
          <TabsPanelProps
            :value="propData"
            @input="val => $emit('update:prop-data', val)"
            :props-schema="propsSchema"
          />
          <q-separator />
        </q-tab-panel>
      </q-tab-panels>
    </q-slide-transition>
    <div class="q-pa-md js-interactive-preview">
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
import { pascalCase, camelCase } from 'case-anything'
import { isArray } from 'is-what'
import merge from 'merge-anything'
import copy from 'copy-anything'
import parseCodeForPrint from '../../helpers/parseCodeForPrint.js'
import InfoCardTitle from './InfoCardTitle.vue'
import TabsPanelTemplate from './TabsPanelTemplate.vue'
import TabsPanelScript from './TabsPanelScript.vue'
import TabsPanelStyle from './TabsPanelStyle.vue'
import TabsPanelProps from './TabsPanelProps.vue'
import MarkdownCode from './MarkdownCode.vue'

export default {
  name: 'InfoCard',
  components: {
    InfoCardTitle,
    TabsPanelTemplate,
    TabsPanelScript,
    TabsPanelStyle,
    TabsPanelProps,
    MarkdownCode,
  },
  props: {
    hideSchema: {
      desc: 'True to not show a Schema tab.',
      type: Boolean,
      default: false,
    },
    title: {
      desc: `The info card's title`,
      type: String,
    },
    tagName: {
      type: String,
    },
    propData: {
      desc: 'The object with the selected values per interactive prop: `{[propKey]: selectedValue}`',
      type: Object,
    },
    propsSchema: {
      desc: 'The EasyForm schema to generate the prop info.',
      type: [Array, Object],
      default: () => [],
    },
    styleClasses: {
      type: Array,
      desc: 'An array of classes to show in the textarea. These classes will be targeted in the dom to apply the custom css typed in the textarea.',
      default: () => ([]),
    },
    styleClassesData: {
      type: Object,
      desc: 'An object with classes as keys and an object as value that has the default styles to add to this class',
      default: () => ({}),
    },
  },
  data () {
    const tabs = this.hideSchema
      ? ['Template', 'Script', 'Style']
      : ['Schema', 'Template', 'Script', 'Style']
    return {
      isExpanded: false,
      tabControl: tabs[0],
      navControl: 'Source',
      tabs,
    }
  },
  computed: {
    varNameProps () { return `${camelCase(this.tagName)}Props` },
    varNameValue () { return `${camelCase(this.tagName)}Value` },
    varNameSchema () { return `schema${pascalCase(this.tagName)}` },
    valuePrintReady () { return parseCodeForPrint(this.propData.value) },
    propDataPrintReady () {
      const { propData, varNameSchema } = this
      return Object.entries(propData)
        .reduce((carry, [propKey, propValue]) => {
          if (propValue === undefined || propValue === '' || propKey === 'value') {
            return carry
          }
          if (propKey === 'schema') {
            carry[propKey] = varNameSchema
            return carry
          }
          carry[propKey] = parseCodeForPrint(propValue)
          return carry
        }, {})
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
