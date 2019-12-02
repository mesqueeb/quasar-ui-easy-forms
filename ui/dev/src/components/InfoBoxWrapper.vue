<template>
  <div class="info-box-wrapper">
    <q-badge :color="color">{{ label }}</q-badge>
    <div class="_inner-wrapper" :style="{borderColor: colorAsHex}">
      <slot />
    </div>
  </div>
</template>

<style lang="sass">
// $

.info-box-wrapper
  > ._inner-wrapper
    border: thin solid
    min-height: 70px
    min-width: 170px
    margin-top: -10px
    // display: flex
    > *
      width: 100%
      height: 100%
      // justify-self: stretch
  .easy-form
    padding: 1em
  // if markdown is used in slot:
  .q-markdown--token
    white-space: pre-line
    word-break: break-word

</style>

<script>
import { pascalCase } from 'case-anything'
import { colors } from 'quasar'

export default {
  name: pascalCase('info-box-wrapper'),
  props: {
    color: {
      type: String,
      validator: val => ['primary', 'secondary', 'accent', 'positive', 'negative', 'info', 'warning'].includes(val),
    },
    label: String,
  },
  computed: {
    colorAsHex () {
      return colors.getBrand(this.color)
    },
  },
  methods: {},
}
</script>
