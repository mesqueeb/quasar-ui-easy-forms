<template>
  <q-btn-toggle
    v-if="!separateButtons"
    :value="value"
    @input="val => $emit('input', val)"
    v-bind="quasarProps"
    class="ef-btn-toggle"
  />
  <div v-else class="ef-btn-toggle ef-btn-toggle--separate-buttons">
    <div
      v-for="option in options"
      :key="option.label"
      :class="{ 'ef-btn-toggle__chosen': value === option.value }"
    >
      <EfBtn
        @click.native="$emit('input', option.value)"
        class="ef-btn -square"
        v-bind="
          merge(option, {
            btnLabel: option.label,
            disable: option.disable || quasarProps.disable,
          })
        "
      />
    </div>
  </div>
</template>

<style lang="sass">
// $
@import '../../index.sass'
</style>

<script>
import merge from 'merge-anything'
import { QBtnToggle } from 'quasar'
import EfBtn from './EfBtn.vue'
import EfDiv from './EfDiv.vue'
import { getGenericValueType } from './sharedProps.js'

export default {
  components: { QBtnToggle, EfBtn, EfDiv },
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
    valueType: getGenericValueType([
      'string',
      'boolean',
      'number',
      'array',
      'object',
      'date',
      'null',
      'undefined',
    ]),
    // EF props:
    separateButtons: {
      desc: 'Tell the component to use separate buttons instead.',
      type: Boolean,
      default: false,
    },
    // Quasar props with modified defaults:
    spread: { type: Boolean, default: true, inheritedProp: 'modified' },
    unelevated: { type: Boolean, default: true, inheritedProp: 'modified' },
    toggleColor: { type: String, default: 'primary', inheritedProp: 'modified' },
    // Quasar props with modified behavior:
    options: {
      inheritedProp: 'modified',
      type: Array,
      desc: 'An array of options. The options can be anything you can pass to EfBtn.',
      examples: ["`[{label: 'One', value: 1}, {label: 'Two', value: 2}]`"],
      default: () => [],
    },
  },
  computed: {
    quasarProps () {
      return merge(this.$attrs, {
        // Quasar props with modified defaults:
        spread: this.spread,
        unelevated: this.unelevated,
        toggleColor: this.toggleColor,
        // Quasar props with modified behavior:
        options: this.options,
      })
    },
  },
  methods: {
    merge,
  },
}
</script>
