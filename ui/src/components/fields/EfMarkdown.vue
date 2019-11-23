<template>
  <q-markdown
    class="ef-markdown"
    v-bind="quasarProps"
    v-on="$listeners"
  />
</template>

<style lang="sass">
// $
@import '../../index.sass'

</style>

<script>
import merge from 'merge-anything'
import { passContentViaValueOrSrc } from './sharedProps.js'

export default {
  name: 'EfMarkdown',
  inheritAttrs: false,
  desc: `For the time being you need to **manually** add the quasar extension 'QMarkdown':

- Install \`q-markdown\` like so:
\`\`\`bash
quasar ext add @quasar/qmarkdown
\`\`\`

${passContentViaValueOrSrc}`,
  props: {
    // prop categories: behavior content general model state style
    value: {
      category: 'model',
      type: String,
      default: '',
    },
    get src () { return this.value },
    // EF props:
    // Quasar props with modified defaults:
    // Quasar props with modified behavior:
  },
  computed: {
    quasarProps () {
      return merge(this.$attrs, {
        // Quasar props with modified defaults:
        // Quasar props with modified behavior:
        src: this.value || this.src
      })
    },
  },
  methods: {}
}
</script>
