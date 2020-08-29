<template>
  <div class="snarkdown" v-html="content" />
</template>

<style lang="stylus" scoped>
// $

// .snarkdown
</style>

<script>
import snarkdown from 'snarkdown'

export default {
  name: 'Snarkdown',
  props: {
    src: String,
  },
  computed: {
    content () {
      return snarkdown(this.src)
    },
  },
  methods: {},
}
</script>
