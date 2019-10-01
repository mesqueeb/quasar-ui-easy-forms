<template>
  <div class="ef-video">
    <EfInput
      v-if="!disable && !viewMode"
      :value="value"
      @input="onInput"
      :rules="rules"
      :lazy-rules="lazyRules"
      :autofocus="autofocus"
      :autogrow="autogrow"
      :view-mode="viewMode"
    />
    <q-video
      v-if="value && (disable || viewMode)"
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

export default {
  components: { EfInput, QVideo },
  name: 'EfVideo',
  inheritAttrs: false,
  props: merge(EfInput.props, {
    // prop categories: behaviour content general model state style
    value: String,
    // EF props:
    // Quasar props with modified defaults:
    // Quasar props with modified behaviour:
    disable: Boolean,
    rules: Array,
    lazyRules: Boolean,
    autofocus: Boolean,
    autogrow: Boolean,
    viewMode: Boolean,
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
        // Quasar props with modified behaviour:
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
