<template>
  <q-page padding>
    <div class="row no-wrap items-start q-gutter-md">
      <q-markdown
        style="flex: 1"
      >{{ description }}</q-markdown>
    </div>
    <div
      v-for="(schema, index) in schemas"
      :key="index"
      class="q-mb-lg"
    >
      <InfoBoxWrapper color="accent" label="interactive preview" class="q-mb-md">
        <EasyForm
          v-model="schema.settings.value"
          v-bind="schema.settings"
          @update:mode="log('update:mode', $event)"
          @field-input="log('@field-input', $event)"
          @cancel="log('@cancel', $event)"
          @save="log('@save', $event)"
          @delete="log('@delete', $event)"
          @archive="log('@archive', $event)"
        />
      </InfoBoxWrapper>
      <InfoCard
        tag="EasyForm"
        v-model="schema.settings"
        :settingsSchema="schema.settingsSchema"
      >
      </InfoCard>
    </div>
  </q-page>
</template>

<style lang="sass" scoped>

</style>

<script>
import EasyForms from 'ui'
import schemasEvaluatedProps from '../schemas/evaluatedProps'
import { getInfoCardSchema } from '../helpers/schemaBuilders'
import { descEvaluatedProps as description } from '../helpers/descriptions'

export default {
  name: 'PageDemo',
  data () {
    return schemasEvaluatedProps.reduce((carry, schema) => {
      const value = schema.reduce((carry, bp) => ({...carry, [bp.id]: undefined}), {})
      const settingsSchema = getInfoCardSchema('EasyForm')
      carry.schemas.push({
        settings: {
          schema,
          value,
          mode: 'edit',
          actionButtons: [],
          columnCount: 2,
        },
        settingsSchema,
      })
      return carry
    }, {
      description,
      schemas: []
    })
  },
  methods: {
    log (...args) {
      console.log(...args)
    },
  },
}
</script>
