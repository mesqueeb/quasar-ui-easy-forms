<template>
  <section
    class="q-my-sm q-mr-md cursor-pointer text-subtitle1"
    :id="value"
    @click="copyHeading(value)"
  >
    <div class="info-card-title">{{ value }}</div>
  </section>
</template>

<script>
import { copyHeading } from '../../helpers/pageUtils.js'

export default {
  name: 'InfoCardTitle',
  props: {
    value: String,
  },
  methods: {
    copyHeading
  }
}
</script>

<style lang="sass">

$title-color: $grey-4
.info-card-title
  margin-left: -24px
  padding: 2px 10px 2px 24px
  background: $title-color
  color: $grey-8
  position: relative
  border-radius: 3px 5px 5px 0
  &:after
    content: ''
    position: absolute
    top: 100%
    left: 0
    width: 0
    height: 0
    border: 0 solid transparent
    border-top-color: scale-color($title-color, $lightness: -15%)
    border-width: 9px 0 0 11px

</style>