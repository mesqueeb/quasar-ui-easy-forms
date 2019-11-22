<template>
  <q-page padding>
    <EasyForm
      class="page-form"
      v-model="pageValue"
      v-bind="pageForm"
    />
    <InfoCard
      class="q-mb-lg"
      tag="EasyForm"
      v-model="exampleForms[pageValue.chosenExample]"
      :settingsSchema="settingsSchema"
    >
      <InfoBoxWrapper
        color="accent"
        label="interactive preview"
        class="q-mb-md js-interactive-preview"
      >
        <EasyForm
          v-bind="exampleForms[pageValue.chosenExample]"
        />
      </InfoBoxWrapper>
    </InfoCard>
  </q-page>
</template>

<style lang="sass">

.page-form .ef-btn-toggle
  border: solid 2px $primary
  border-radius: 6px

</style>

<script>
import demoSchemas from '../schemas/index'
import { getInfoCardSchema } from '../helpers/schemaBuilders'

export default {
  name: 'EasyFormDemo',
  props: {
    schemaId: String
  },
  data () {
    const { pageForm, exampleForms } = demoSchemas[this.schemaId]
    const settingsSchema = getInfoCardSchema('EasyForm')
    return {
      pageValue: { chosenExample: 0 },
      pageForm,
      exampleForms,
      settingsSchema,
    }
  },
  computed: {},
  methods: {
    log (...args) {
      console.log(...args)
    },
  },
}
</script>
