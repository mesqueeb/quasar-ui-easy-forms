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
import { QVideo } from 'quasar'

export default {
  components: { QVideo },
  name: 'EfVideo',
  props: {
    value: String,
    disable: Boolean,
    rules: Array,
    lazyRules: Boolean,
    autofocus: Boolean,
    autogrow: Boolean,
    viewMode: Boolean,
  },
  computed: {},
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
