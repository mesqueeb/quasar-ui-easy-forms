<template>
  <a class="ef-link" v-bind="attributes">
    {{ cValue }}
    <q-icon v-if="newWindow" name="open_in_new" />
  </a>
</template>

<style lang="sass">
// $
@import '../../index.sass'

.ef-link
  text-decoration: none
</style>
<script>
import merge from 'merge-anything'
import { isFullString } from 'is-what'
import { QIcon } from 'quasar'
import { getGenericValueType } from './sharedProps.js'

export default {
  name: 'EfLink',
  components: { QIcon },
  props: {
    // prop categories: behavior content general model state style
    // EF props:
    value: {
      category: 'model',
      type: String,
      desc:
        "`value` is the link \"label\". When no `value` is defined it will default to the base url extracted from href. (eg. 'https://www.github.com' will be 'github.com')\n(`label` on the other hand is used for the external label of `<EfField />`)",
    },
    valueType: getGenericValueType('string'),
    href: {
      category: 'model',
      type: String,
      required: true,
    },
    newWindow: {
      type: Boolean,
      default: false,
      desc:
        'When this is true it will open link in a new window; add an icon; `rel="noreferrer"` is added for security reasons.',
    },
    // Quasar props with modified defaults:
    // Quasar props with modified behavior:
  },
  computed: {
    attributes () {
      const { href, newWindow } = this
      const newWindowAttrs = !newWindow
        ? {}
        : {
            target: '_blank',
            rel: 'noreferrer',
          }
      return merge(this.$attrs, newWindowAttrs, {
        href,
      })
    },
    cValue () {
      const { value, href } = this
      if (isFullString(value)) return value
      const result = String(this.href)
        .replace('https://www.', '')
        .replace('https://', '')
      return result.split('?')[0]
    },
  },
  methods: {},
}
</script>
