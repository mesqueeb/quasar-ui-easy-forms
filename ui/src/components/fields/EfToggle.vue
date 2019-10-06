<template>
  <q-toggle
    class="ef-toggle"
    v-model="cValue"
    v-bind="quasarProps"
  />
</template>

<style lang="sass">
// $
@import '../../index.sass'

// .ef-toggle

</style>

<script>
import merge from 'merge-anything'
import { QToggle } from 'quasar'
import { getGenericValueType } from './sharedProps.js'

export default {
  components: { QToggle },
  name: 'EfToggle',
  inheritAttrs: false,
  props: {
    // prop categories: behavior content general model state style
    value: {
      category: 'model',
      type: Boolean,
      default: false,
    },
    valueType: getGenericValueType('boolean'),
    // EF props:
    // Quasar props with modified defaults:
    // Quasar props with modified behavior:
  },
  computed: {
    quasarProps () {
      return merge(this.$attrs, {
        // Quasar props with modified defaults:
        // Quasar props with modified behavior:
      })
    },
    cValue: {
      get () {
        const { value } = this
        return value
      },
      set (val) { this.$emit('input', val) },
    },
  },
  methods: {},
}
</script>
