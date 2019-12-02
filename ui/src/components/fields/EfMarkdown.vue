<template>
  <q-markdown
    class="ef-markdown"
    v-bind="quasarProps"
    v-on="$listeners"
  />
</template>

<style src="@quasar/quasar-ui-qmarkdown/dist/index.css"></style>

<script>
import merge from 'merge-anything'
import { passContentViaValueOrSrc } from './sharedProps.js'
import { QMarkdown } from '@quasar/quasar-ui-qmarkdown'

export default {
  name: 'EfMarkdown',
  inheritAttrs: false,
  components: { QMarkdown },
  desc: `${passContentViaValueOrSrc}`,
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
    noLineNumbers: {
      inheritedProp: 'modified',
      type: Boolean,
      default: true,
    },
    // Quasar props with modified behavior:
  },
  computed: {
    quasarProps () {
      return merge(this.$attrs, {
        // Quasar props with modified defaults:
        noLineNumbers: this.noLineNumbers,
        // Quasar props with modified behavior:
        src: this.value || this.src,
      })
    },
  },
  methods: {}
}
</script>
