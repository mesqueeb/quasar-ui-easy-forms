<template>
  <q-btn
    class="ef-btn"
    @keydown="onKeydown"
    @keyup.native="onKeyup"
    @click="onClick"
    @focus="onFocus"
    :label="label"
    color="primary"
    size="20px"
    flat
  >
    <slot />
  </q-btn>
</template>

<style lang="stylus" scoped>
// $
@import '../../index.styl'

// .ef-btn

</style>

<script>
import { QBtn } from 'quasar'

export default {
  components: { QBtn },
  name: 'EfBtn',
  props: {
    label: String,
  },
  computed: {},
  methods: {
    onFocus (event) { this.$emit('focus', event) },
    onClick (event) { this.$emit('click', event) },
    onKeyup (event) { this.$emit('keyup', event) },
    onKeydown (event) { this.$emit('keydown', event) },
  }
}
</script>
