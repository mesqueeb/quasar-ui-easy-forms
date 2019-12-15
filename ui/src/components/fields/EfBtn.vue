<template>
  <q-btn class="ef-btn" v-bind="quasarProps" v-on="$listeners" />
</template>

<style lang="sass">
// $
@import '../../index.sass'

.ef-btn // use with: push
  &.-square
    width: 100%
    height: 100%
</style>

<script>
import merge from 'merge-anything'
// import { isFunction } from 'is-what'
import { QBtn } from 'quasar'
import { getGenericValueType } from './sharedProps.js'

export default {
  components: { QBtn },
  name: 'EfBtn',
  inheritAttrs: false,
  props: {
    // prop categories: behavior content general model state style
    // EF props:
    btnLabel: {
      category: 'content',
      type: String,
      desc:
        '`btnLabel` is the button\'s "label". (`label` on the other hand is used for the external label of `<EfField />`)',
    },
    // Quasar props with modified defaults:
    color: {
      inheritedProp: 'modified',
      type: String,
      default: 'primary',
    },
    // Quasar props with modified behavior:
  },
  computed: {
    quasarProps () {
      return merge(this.$attrs, {
        // Quasar props with modified defaults:
        color: this.color,
        // Quasar props with modified behavior:
        label: this.btnLabel || this.$attrs.label,
      })
    },
  },
  methods: {},
}
</script>
