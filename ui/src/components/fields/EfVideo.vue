<template>
  <q-video v-if="readonly" class="ef-video" v-bind="quasarProps" />
  <EfInput v-else class="ef-video" :value="value" @input="onInput" v-bind="quasarProps" />
</template>

<style lang="sass">
// $
@import '../../index.sass'

// .ef-video
</style>

<script>
import merge from 'merge-anything'
import { QVideo } from 'quasar'
import EfInput from './EfInput.vue'
import { getGenericValueType, passContentViaValueOrSrc } from './sharedProps.js'

export default {
  components: { EfInput, QVideo },
  name: 'EfVideo',
  inheritAttrs: false,
  desc: `- When \`readonly: false\` it shows an input field in which a user can paste a YouTube url.
- When \`readonly: true\` it shows the embedded video via the QVideo component.

Currently it only works with YouTube urls.

${passContentViaValueOrSrc}
However, in case you will also use \`readonly: false\` (to show the "input") you _must_ use 'value' and not 'src'.`,
  props: merge(EfInput.props, {
    // prop categories: behavior content general model state style
    value: {
      category: 'model',
      type: String,
      default: '',
      desc:
        "Requires a YouTube url to be pasted. Will automatically re-format itself to an \"embed\" url after. (use 'value' OR 'src' prop)",
    },
    get src () {
      return this.value
    },
    valueType: getGenericValueType('string'),
    // EF props:
    // Quasar props with modified defaults:
    // Quasar props with modified behavior:
    readonly: {
      category: 'state',
      inheritedProp: 'modified',
      type: Boolean,
      default: false,
      desc: "Setting this field to `readonly` will show this field's embedded YouTube video.",
    },
  }),
  computed: {
    quasarProps () {
      const inheritedProps = Object.keys(EfInput.props).reduce((carry, propKey) => {
        carry[propKey] = this[propKey]
        return carry
      }, {})
      return merge(inheritedProps, this.$attrs, {
        src: this.value || this.src,
        // Quasar props with modified defaults:
        // Quasar props with modified behavior:
      })
    },
  },
  methods: {
    onInput (val) {
      if (!val) return this.$emit('input', '')
      let id
      if (val.includes('watch?v=')) {
        const relevantParts = val.split('=').slice(1)
        id = relevantParts.join('=')
      } else {
        const relevantParts = val.split('/').slice(1)
        id = relevantParts.slice(-1)
      }
      const formattedUrl = 'https://www.youtube.com/embed/' + id
      return this.$emit('input', formattedUrl)
    },
  },
}
</script>
