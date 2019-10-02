<template>
  <div class="ef-video">
    <EfInput
      v-if="!readonly"
      :value="value"
      @input="onInput"
      v-bind="quasarProps"
    />
    <q-video
      v-if="value && readonly"
      :src="value"
    />
  </div>
</template>
<style lang="stylus" scoped>
// $
@import '../../index.styl'

// .ef-video

</style>

<script>
import merge from 'merge-anything'
import { QVideo } from 'quasar'
import EfInput from './EfInput.vue'
import { getGenericValueType } from './sharedProps.js'

export default {
  components: { EfInput, QVideo },
  name: 'EfVideo',
  inheritAttrs: false,
  desc: 'Try toggling readonly mode with a YouTube url for its model.',
  props: merge(EfInput.props, {
    // prop categories: behavior content general model state style
    value: {
      category: 'model',
      type: String,
      desc: 'Requires a YouTube url to be pasted. Will automatically re-format itself to an "embed" url after.',
    },
    valueType: getGenericValueType('string'),
    // EF props:
    // Quasar props with modified defaults:
    // Quasar props with modified behavior:
    readonly: {
      category: 'state',
      quasarProp: 'modified',
      type: Boolean,
      default: false,
      desc: '`readonly` is used for \'view\' mode of an EasyForm. It will show this field\'s embedded YouTube video in this case. Powered by QVideo.',
    },
  }),
  computed: {
    quasarProps () {
      const inheritedProps = Object.keys(EfInput.props)
        .reduce((carry, propKey) => {
          carry[propKey] = this[propKey]
          return carry
        }, {})
      return merge(inheritedProps, this.$attrs, {
        // Quasar props with modified defaults:
        // Quasar props with modified behavior:
      })
    },
  },
  methods: {
    onInput(val) {
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
