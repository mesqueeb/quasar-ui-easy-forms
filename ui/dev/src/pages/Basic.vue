<template>
  <q-page padding>
    <div class="row no-wrap items-start q-gutter-md">
      <q-markdown
        style="flex: 1"
      ></q-markdown>
    </div>
    <q-badge color="purple-4">interactive preview:</q-badge>
    <div class="interactive-preview mb-md">
      <EasyForm
        v-model="settings.value"
        :schema="settings.schema"
        :mode="settings.mode"
        @update:mode="log('update:mode', $event)"
        @field-input="log('@field-input', $event)"
        @cancel="log('@cancel', $event)"
        @save="log('@save', $event)"
        @delete="log('@delete', $event)"
        @archive="log('@archive', $event)"
      />
    </div>
    <InfoCard
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
import schemaBasic from '../schemas/basic'
import { getInfoCardSchema } from '../helpers/schemaBuilders'

export default {
  name: 'PageDemo',
  data () {
    const schema = schemaBasic
    const value = schemaBasic.reduce((carry, bp) => ({...carry, [bp.id]: undefined}), {})
    const settingsSchema = getInfoCardSchema('EasyForm')
    return {
      settings: {
        schema,
        value,
        mode: 'edit',
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
