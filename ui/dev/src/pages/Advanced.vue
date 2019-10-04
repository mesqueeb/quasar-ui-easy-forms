<template>
  <q-page padding>
    <div class="row no-wrap items-start q-gutter-md">
      <q-markdown
        style="flex: 1"
      >{{ descAdvanced }}</q-markdown>
    </div>
    <q-badge color="purple-4">interactive preview:</q-badge>
    <div class="interactive-preview mb-md">
      <EasyForm
        v-model="settings.value"
        v-bind="settings"
        @update:mode="log('update:mode', $event)"
        @field-input="log('@field-input', $event)"
        @cancel="log('@cancel', $event)"
        @save="log('@save', $event)"
        @delete="log('@delete', $event)"
        @archive="log('@archive', $event)"
      />
    </div>
    <InfoCard
      tag="EasyForm"
      v-model="settings"
      :settingsSchema="settingsSchema"
    >
    </InfoCard>
  </q-page>
</template>

<style lang="stylus" scoped>

</style>

<script>
import EasyForms from 'ui'
import schemaAdvanced from '../schemas/advanced'
import { getInfoCardSchema } from '../helpers/schemaBuilders'
import { descAdvanced } from '../helpers/descriptions'

export default {
  name: 'PageDemo',
  data () {
    const schema = schemaAdvanced
    const value = schemaAdvanced.reduce((carry, bp) => ({...carry, [bp.id]: undefined}), {})
    const settingsSchema = getInfoCardSchema('EasyForm')
    return {
      descAdvanced,
      settings: {
        schema,
        value,
        mode: 'view',
        schemaAsCode: schema,
      },
      settingsSchema,
    }
  },
  methods: {
    log (...args) {
      console.log(...args)
    },
  },
}
</script>
