<template>
  <q-page padding>
    <div class="row no-wrap items-start q-gutter-md">
      <q-markdown
        style="flex: 1"
      >{{ description }}</q-markdown>
    </div>
    <EasyField v-bind="examplePicker" v-model="selectedExampleIndex" class="q-mb-md" />
    <div
      v-for="(example, index) in selectedExamples"
      :key="index"
      class="q-mb-lg"
    >
      <InfoCard
        tag="EasyForm"
        v-model="example.settings"
        :settingsSchema="example.settingsSchema"
      >
        <EasyField v-bind="example.titleField" style="margin: -1em 0 1.6em" />
        <InfoBoxWrapper color="accent" label="interactive preview" class="q-mb-md">
          <EasyForm
            v-model="example.settings.value"
            v-bind="example.settings"
          />
            <!-- @update:mode="log('update:mode', $event)"
            @field-input="log('@field-input', $event)"
            @cancel="log('@cancel', $event)"
            @save="log('@save', $event)"
            @delete="log('@delete', $event)"
            @archive="log('@archive', $event)" -->
        </InfoBoxWrapper>
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
    const examplePicker = {
      fieldType: 'btn-toggle',
      options: schemasEvaluatedProps.map((schema, index) => {
        return {label: schema[0].label, value: index}
      }),
      noCaps: true,
      style: 'border: solid thin',
      unelevated: true,
      toggleColor: 'primary',
      color: 'white',
      textColor: 'black',
      rounded: true,
    }
    const examples = schemasEvaluatedProps.reduce((carry, schema) => {
      const value = schema.reduce((carry, bp) => ({...carry, [bp.id]: undefined}), {})
      const settingsSchema = getInfoCardSchema('EasyForm')
      carry.push({
        titleField: schema.slice(0, 1),
        settings: {
          schema: schema.slice(1),
          value,
          mode: 'edit',
          actionButtons: schema.slice(0, 1)[0].formActionButtons || [],
          columnCount: 2,
        },
        settingsSchema,
      })
      return carry
    }, [])
    return {
      description,
      examples,
      examplePicker,
      selectedExampleIndex: 0,
    }
  },
  computed: {
    selectedExamples () {
      const { selectedExampleIndex, examples } = this
      return [examples[selectedExampleIndex]]
    }
  },
  methods: {
    log (...args) {
      console.log(...args)
    },
  },
}
</script>
