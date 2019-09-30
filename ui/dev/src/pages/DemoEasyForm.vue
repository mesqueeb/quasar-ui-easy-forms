<template>
  <q-page padding>
    <EasyForm
      :schema="schema"
      @update:mode="(...args) => log('update:mode', args)"
      @field-input="(...args) => log('@field-input', args)"
      @cancel="(...args) => log('@cancel', args)"
      @save="(...args) => log('@save', args)"
      @delete="(...args) => log('@delete', args)"
      @archive="(...args) => log('@archive', args)"
    />
  </q-page>
</template>

<style lang="sass" scoped>
.directive-target
  width: 50px
  height: 50px
</style>

<script>
import baseSchema from '../schemas/index'

export default {
  name: 'PageDemo',
  data () {
    const schema = Object.values(baseSchema)
    return { schema }
  },
  methods: {
    log(...args) {
      console.log(...args)
    },
  },
}
</script>
