<template>
  <div :class="[
    'ef-buttons', {
    '--big': big,
    '--disabled': disable
  }]">
    <q-btn-toggle
      class="_q-tgl"
      v-if="!big"
      :value="value"
      @input="val => $emit('input', val)"
      toggle-color="primary"
      :options="options"
      unelevated
      rounded
      :disable="disable"
    />
    <div
      v-if="big"
      :style="style"
      class="_inner"
    >
      <div
        v-for="option in options"
        :key="option.label"
        :class="{'_chosen': value === option.value}"
      >
        <q-btn
          :label="option.label"
          @click="$emit('input', option.value)"
          class="my-q-btn--square"
          :disable="option.disabled || disable"
          push
        />
      </div>
    </div>
  </div>
</template>

<style lang="stylus">
// $
@import '../../index.styl'

.ef-buttons
  width 100%
  ._q-tgl
    border 3px solid $primary
    border-radius md !important
    color $text--dark
    > *
      py 1em !important
  >._inner
    width 100%
    grid--square()
    grid-template-columns 1fr 1fr
    media-sm grid-template-columns 1fr 1fr 1fr
    // ↳ these are hard coded in the style in the template
    grid-gap 6vw
    >._chosen > *
      transform translate3d(0, 3px, 0)
      border-bottom-width 0
      background darken($primary, 20%)
  &.--disabled
    ._q-tgl
      border 2px solid $gray-bg--dark
    .q-btn.disabled
      opacity 0.2 !important
    .q-btn.bg-primary
      background $gray-bg--dark !important
      color inherit !important
      opacity 1 !important

</style>

<script>
import { isOdd } from '../../helpers/intHelpers'
import { QBtnToggle, QBtn } from 'quasar'

export default {
  components: { QBtnToggle, QBtn },
  name: 'EfButtons',
  props: {
    value: [String, Number],
    options: Array,
    big: Boolean,
    disable: Boolean,
  },
  computed: {
    style () {
      const ipadLandscape = this.$q.screen.md || this.$q.screen.gt.md
      const btnWidth = (ipadLandscape) ? '25vw' : '1fr'
      const gridTemplateColumns = isOdd(this.options.length)
        ? `${btnWidth} ${btnWidth} ${btnWidth}`
        : `${btnWidth} ${btnWidth}`
      return {gridTemplateColumns}
    },
  },
  methods: {
    isOdd,
  }
}
</script>
