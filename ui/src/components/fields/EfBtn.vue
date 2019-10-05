<template>
  <q-btn
    class="ef-btn"
    v-bind="quasarProps"
    v-on="$listeners"
    @click="qClick"
  />
</template>

<style lang="stylus" scoped>
// $
@import '../../index.styl'

.ef-btn // use with: push
  font-size 20px
  media-sm font-size 20px
  white-space pre-line
  border-radius sm
.-square
  width 100%
  height 100%

</style>

<script>
import merge from 'merge-anything'
import { isFunction } from 'is-what'
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
    onClick: {
      category: 'behavior',
      type: Function,
      desc: 'The function to be triggered on click. Will receive ...',
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
    qClick (event) {
      const { onClick } = this
      if (isFunction(onClick)) return onClick(this, this.$store)
      this.$emit('click', event)
    },
  }
}
</script>
