<template>
  <div class="info-box-wrapper">
    <q-badge :color="color">{{ label }}</q-badge>
    <div class="_inner-wrapper">
      <slot />
    </div>
  </div>
</template>

<style lang="sass">
// $

.info-box-wrapper
  > ._inner-wrapper
    border: thin solid $primary
    min-height: 70px
    min-width: 170px
    margin-top: -10px
    padding: 1em
    // display: flex
    > *
      width: 100%
      height: 100%
      // justify-self: stretch
  // if markdown is used in slot:
  .q-markdown--token
    white-space: pre-line
    word-break: break-word

</style>

<script>
import { pascalCase } from 'case-anything'

export default {
  name: pascalCase('info-box-wrapper'),
  props: {
    color: String,
    label: String,
  },
  computed: {},
  methods: {},
}
</script>
