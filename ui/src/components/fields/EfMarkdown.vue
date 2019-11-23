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
\`\`\`

There are two ways to pass the actual markdown content:
- via the native q-markdown 'src' prop
- via the 'value' prop

When passed as 'value' it will be included in the formData if the form is editable.`,
  props: {
    // prop categories: behavior content general model state style
    value: {
      category: 'model',
      type: String,
      default: '',
    },
    // EF props:
    // Quasar props with modified defaults:
    src: {
      category: 'model',
      type: String,
      default: '',
    },
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
