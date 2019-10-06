<template>
  <q-btn
    class="ef-btn"
    v-bind="quasarProps"
    v-on="merge(events, $listeners)"
  />
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
    value: {
      category: 'model|content',
      type: String,
      desc: '`value` is the button\'s "label". (`label` on the other hand is used for the external label of `<EfField />`)',
    },
    valueType: getGenericValueType('string'),
    events: {
      category: 'behavior',
      type: Object,
      desc: 'An Object with an event name as key and the handler function as value. The function you pass will receive the native event payload as first parameter and the current value as second: ($event, val) => {}',
      default: () => ({}),
      examples: ['{click: console.log}'],
    },
    // Quasar props with modified defaults:
    color: {
      quasarProp: 'modified',
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
        label: this.value,
      })
    },
  },
  methods: {
    merge,
  }
}
</script>
