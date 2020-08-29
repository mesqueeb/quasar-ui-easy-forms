<template>
  <q-page padding class="page-new-demo">
    <!-- <ApiComponentExample filePath="../App.vue" /> -->
    <!-- <ApiComponentExample filePath="ui/src/components/EasyForm.vue" /> -->
    <ExampleSection filePath="new-examples/Basics.vue" />
  </q-page>
</template>

<style lang="sass">
.page-new-demo
  > *
    margin-bottom: 48px
</style>

<script>
import { ApiComponentExample } from '@planetar/api-card'
import { ExampleSection } from '@planetar/example-card'

export default {
  name: 'NewDemo',
  components: { ApiComponentExample, ExampleSection },
  props: {},
  data () {
    return {}
  },
  computed: {},
  methods: {},
}
</script>
