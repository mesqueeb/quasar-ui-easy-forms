<template>
  <q-page padding>
    <div class="row no-wrap items-start q-gutter-md">
      <q-markdown
        style="flex: 1"
      >{{ description }}</q-markdown>
    </div>
    <EasyField v-bind="examplePicker" v-model="selectedExampleIndex" class="q-mb-md example-picker" />
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
        <InfoBoxWrapper
          color="accent"
          label="interactive preview"
          class="q-mb-md js-interactive-preview"
        >
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

<style lang="sass">

.example-picker .ef-btn-toggle
  border: solid 2px $primary
  border-radius: 6px

</style>

<script>
import EasyForms from 'ui'
import schemas from '../schemas/evaluatedProps'
import { getInfoCardSchema } from '../helpers/schemaBuilders'
import { evaluatedProps as description } from '../helpers/descriptions'

export default {
  name: 'PageDemo',
  data () {
    const examplePicker = {
      fieldType: 'btn-toggle',
      options: schemas.map((schema, index) => {
        return {label: schema[0].label, value: index}
      }),
      noCaps: true,
    }
    const examples = schemas.reduce((carry, schema) => {
      const settingsSchema = getInfoCardSchema('EasyForm')
      carry.push({
        titleField: schema.slice(0, 1),
        settings: {
          schema: schema.slice(1),
          value: {},
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
