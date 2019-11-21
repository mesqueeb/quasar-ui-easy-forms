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

export default {
  name: 'EfMarkdown',
  inheritAttrs: false,
  desc: `For the time being you need to **manually** add the quasar extension 'QMarkdown':

- Install \`q-markdown\` like so:
\`\`\`bash
quasar ext add @quasar/qmarkdown
\`\`\``,
  props: {
    // prop categories: behavior content general model state style
    value: {
      category: 'model',
      type: String,
    },
    // EF props:
    // Quasar props with modified defaults:
    // Quasar props with modified behavior:
  },
  computed: {
    quasarProps () {
      return merge(this.$attrs, {
        // Quasar props with modified defaults:
        // Quasar props with modified behavior:
        src: this.value
      })
    },
  },
  methods: {}
}
</script>
