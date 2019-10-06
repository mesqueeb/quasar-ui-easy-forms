<template>
  <div :class="[
    'ef-btn-toggle', {
    '-big': big,
    '-readonly': quasarProps.readonly,
  }]">
    <q-btn-toggle
      v-if="!big"
      :value="value"
      @input="val => $emit('input', val)"
      v-bind="quasarProps"
    />
    <div
      v-if="big"
      :style="style"
      class="ef-btn-toggle__inner"
    >
      <div
        v-for="option in options"
        :key="option.label"
        :class="{'ef-btn-toggle__chosen': value === option.value}"
      >
        <EfBtn
          :value="option.label"
          @click.native="$emit('input', option.value)"
          class="ef-btn -square"
          v-bind="merge(option, {
            label: undefined,
            disable: option.disable || quasarProps.disable
          })"
        />
      </div>
    </div>
  </div>
</template>

<style lang="sass">
// $
@import '../../index.sass'

.ef-btn-toggle
  width: 100%
  >.ef-btn-toggle__inner
    width: 100%
    grid-template-columns: 1fr 1fr
    @media screen and (min-width: 600px)
      grid-template-columns: 1fr 1fr 1fr
    // ↳ these are hard coded in the style in the template
    grid-gap: 6vw
    // start grid--square:
    display: grid
    justify-content: center
    align-content: center
    > div
      height: 0
      width: 100%
      padding-bottom: 100%
      position: relative
      > *
        position: absolute
    // end grid--square
    >.ef-btn-toggle__chosen > *
      transform: translate3d(0, 3px, 0)
      border-bottom-width: 0
      box-shadow: inset 0 0 0 1000px rgba(0,0,0,.2)

</style>

<script>
import merge from 'merge-anything'
import { isOdd } from '../../helpers/intHelpers'
import { QBtnToggle } from 'quasar'
import EfBtn from './EfBtn.vue'
import { big, getGenericValueType } from './sharedProps.js'

export default {
  components: { QBtnToggle, EfBtn },
  name: 'EfBtnToggle',
  desc: 'EfBtnToggle has a very different view when `big: true`',
  inheritAttrs: false,
  props: {
    // prop categories: behavior content general model state style
    value: {
      category: 'model',
      type: undefined,
      desc: '`value` is the selected button\'s "value".',
    },
    valueType: getGenericValueType(['string', 'boolean', 'number', 'array', 'object', 'date', 'null']),
    // EF props:
    big,
    // Quasar props with modified defaults:
    unelevated: {type: Boolean, default: true, quasarProp: 'modified'},
    toggleColor: {type: String, default: 'primary', quasarProp: 'modified'},
    // Quasar props with modified behavior:
    options: {
      quasarProp: 'modified',
      type: Array,
      desc: 'An array of options. The options can be anything you can pass to EfBtn.',
      examples: ['`[{label: \'One\', value: 1}, {label: \'Two\', value: 2}]`'],
      default: () => [],
    },
  },
  computed: {
    quasarProps () {
      return merge(this.$attrs, {
        // Quasar props with modified defaults:
        unelevated: this.unelevated,
        toggleColor: this.toggleColor,
        // Quasar props with modified behavior:
        options: this.options,
      })
    },
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
    merge,
  }
}
</script>
