<template>
  <div class="primary-color-picker row items-center">
    <div class="q-mr-sm text-bold">Update color:</div>
    <div class="_box" :style="`background: ${color}`">
      <q-popup-proxy transition-show="scale" transition-hide="scale">
        <q-color v-model="color" @change="apply" />
      </q-popup-proxy>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
// $

.primary-color-picker
  ._box
    cursor: pointer
    width: 30px
    height: 30px
    border: thin solid white
</style>

<script>
import { colors } from 'quasar'
const { setBrand } = colors

export default {
  name: 'PrimaryColorPicker',
  props: {},
  data () {
    return { color: '#9c81dc' }
  },
  computed: {},
  methods: {
    apply () {
      const { color } = this
      setBrand('primary', color)
    },
  },
}
</script>
