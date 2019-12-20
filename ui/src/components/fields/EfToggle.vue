<template>
  <q-toggle v-else class="ef-toggle" v-model="cValue" v-bind="quasarProps" />
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
    disable: {
      inheritedProp: 'modified',
      type: Boolean,
      default: false,
      desc: 'Disables the ability to interact with the field. Is `true` when `readonly: true`',
    },
  },
  computed: {
    quasarProps () {
      return merge(this.$attrs, {
        // Quasar props with modified defaults:
        // Quasar props with modified behavior:
        disable: this.cDisable,
      })
    },
    cValue: {
      get () {
        const { value } = this
        return value
      },
      set (val) {
        this.$emit('input', val)
      },
    },
    cDisable () {
      return this.$attrs.readonly || this.disable
    },
  },
  methods: {},
}
</script>
