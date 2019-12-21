<template>
  <q-btn class="ef-btn" v-bind="quasarProps" v-on="$listeners" />
</template>

<script>
import merge from 'merge-anything'
// import { isFunction } from 'is-what'
import { QBtn } from 'quasar'
import { getGenericValueType } from './sharedProps.js'

export default {
  components: { QBtn },
  name: 'EfBtn',
  inheritAttrs: false,
  desc: `EfBtn is a wrapper around QBtn. The only difference is that you can pass the button label as \`btnLabel\`. This is required because when using QBtn it will always use the same label as your field label.

It also defaults to \`color: primary\` which is nice. 😄

All other props/attributes are passed on.`,
  props: {
    // prop categories: behavior content general model state style
    // EF props:
    btnLabel: {
      category: 'content',
      type: String,
      desc:
        '`btnLabel` is the button\'s "label". (`label` on the other hand is used for the field label of `<EasyField />`)',
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
