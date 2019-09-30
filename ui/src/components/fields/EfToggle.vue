<template>
  <q-toggle
    class="ef-toggle"
    v-model="cValue"
    v-bind="quasarProps"
  />
</template>

<style lang="stylus" scoped>
// $
@import '../../index.styl'

// .ef-toggle

</style>

<script>
import merge from 'merge-anything'
import { QToggle } from 'quasar'

export default {
  components: { QToggle },
  name: 'EfToggle',
  inheritAttrs: false,
  props: {
    // prop categories: behaviour content general model state style
    value: {
      type: Boolean,
      default: false,
    },
    // EF props:
    // Quasar props with modified defaults:
    // Quasar props with modified behaviour:
  },
  computed: {
    quasarProps () {
      return merge(this.$attrs, {
        // Quasar props with modified defaults:
        // Quasar props with modified behaviour:
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
