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
      no-caps
    >
      <q-tab name="EasyField props" label="EasyField props" />
      <q-tab name="Quasar props" label="Quasar props" v-if="iSettingsSchemaQuasar.length" />
      <q-tab name="source" label="View source" />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="tabControl" animated>
      <q-tab-panel name="EasyField props">
        <EasyForm
          style="grid-gap: 1em"
          @field-input="updateSettings"
          :action-buttons="[]"
          :columnCount="2"
          mode="edit"
          :schema="settingsSchemaEf"
          :data="settings"
        />
      </q-tab-panel>
      <q-tab-panel name="Quasar props" v-if="iSettingsSchemaQuasar.length">
        <EasyForm
          style="grid-gap: 1em"
          @field-input="updateSettings"
          :action-buttons="[]"
          :columnCount="2"
          mode="edit"
          :schema="iSettingsSchemaQuasar"
          :data="settings"
        />
      </q-tab-panel>
      <q-tab-panel name="source">
        <SourceTab :settings="settings" :settingsMetaData="settingsMetaData" />
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
    settingsSchemaEf: {type: Array, default: []},
    settingsSchemaQuasar: {type: Array, default: []},
    selectedField: String,
    settingsMetaData: Object,
    fieldValue: undefined, // any
  },
  data () {
    return {
      tabControl: 'EasyField props',
      iSettingsSchemaQuasar: this.settingsSchemaQuasar
    }
  },
  mounted () {
    const { selectedField, updateAllSettings } = this
    const quasarComponentName = 'Q' + selectedField[0].toUpperCase() + selectedField.slice(1)
    import(
        /* webpackChunkName: "quasar-api" */
        /* webpackMode: "lazy-once" */
        `quasar/dist/api/${quasarComponentName}.json`
      ).then(component => {
        console.log('component → ', component)
        if (!component.props) return
        const updateSettingsWith = {}
        const otherProps = Object.entries(component.props)
          .reduce((carry, [propKey, propInfo]) => {
            // do nothing on duplicate props
            if (propKey === 'value') return carry
            const camelCased = propKey.replace(/-([a-z])/g, g => g[1].toUpperCase())
            if (this.settingsSchemaQuasar.some(s => s.id === camelCased)) return carry

            const { desc, type, examples } = propInfo

            const typeIsOrIncludesBoolean = type === 'Boolean' || (isArray(type) && type.includes('Boolean'))
            const typeIsOrIncludesString = type === 'String' || (isArray(type) && type.includes('String'))
            // make the updateSettingsWith object to send to parent
            if (typeIsOrIncludesBoolean) {
              updateSettingsWith[propKey] = false
            } else if (typeIsOrIncludesString) {
              updateSettingsWith[propKey] = ''
            } else {
              updateSettingsWith[propKey] = null
            }

            // make the raw prop info from the components into an EasyForm:
            const easyField = {
              id: propKey,
              label: propKey,
              subLabel: desc,
              fieldType: typeIsOrIncludesBoolean ? 'toggle' : 'input',
              valueType: type === 'Number' ? 'number' : undefined,
              placeholder: !isArray(examples) ? '' : examples.join(', '),
            }
            carry.push(easyField)
            return carry
          }, [])
        updateAllSettings(updateSettingsWith)
        this.iSettingsSchemaQuasar.push(
          {label: 'Regular Quasar props', fieldType: 'title'},
          ...otherProps,
          {label: 'And many more...', fieldType: 'title'},
        )
      })
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
    updateSettings ({id, value}) {
      const settings = copy(this.settings)
      settings[id] = value
      this.$emit('input', settings)
    },
    updateAllSettings (newSettings) {
      this.$emit('update-all-settings', newSettings)
    },
  },
}
</script>
