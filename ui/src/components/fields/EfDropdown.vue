<template>
  <q-select
    :class="[
      'ef-dropdown', {
      '-big': big,
      '-view-mode': viewMode,
      '-disable': disable && !viewMode,
    }]"
    v-model="cValue"
    :options="cOptions"
    outlined
    map-options
    autogrow
    :disable="disable"
    :multiple="multiple"
    :use-chips="multiple"
    :hide-dropdown-icon="disable"
    :label="cValue ? undefined : placeholder"
  />
</template>

<style lang="stylus">
// $
@import '../../index.styl'

.ef-dropdown
  width 100%
  .q-field__control
    border-radius md !important
  .q-field__control:before
    border 3px $primary solid !important
  .q-field__suffix
    color $text--dark
  .q-field__native
    color $text--dark
    text-align right
    > span
      width 100%
  &.-big
    font-size 25px
    .q-field__control
      py .4em !important
    .q-field__control:before
      border 6px $primary solid !important
    .q-field__native
      line-height 1.2 !important
    .q-select__dropdown-icon
      transform scale(1.5)
  &.-disabled
    .q-field__control
      background $gray-bg
      > div
        opacity 1 !important
    .q-field__control:before
      border none !important
  &.-view-mode
    .q-field__control:before
      border 1px $gray-bg--dark solid !important
    .q-field__control > div
      opacity 1 !important

</style>

<script>
import { isFunction, isString, isPlainObject } from 'is-what'
import copy from 'copy-anything'
// import { QSelect } from 'quasar'

export default {
  // components: { QSelect },
  name: 'EfDropdown',
  props: {
    value: [String, Object, Number, Array],
    options: [Array, Function],
    big: Boolean,
    disable: Boolean,
    multiple: Boolean,
    placeholder: String,
    viewMode: Boolean,
  },
  computed: {
    cValue: {
      get () {
        return (this.multiple)
          ? Object.keys(this.value).filter(key => this.value[key])
          : this.value
      },
      set (val) {
        if (!this.multiple) {
          const cleanVal = (isPlainObject(val) && ('value' in val))
            ? val.value
            : val
          this.$emit('input', cleanVal)
          return
        }
        const valueCopy = copy(this.value)
        const valueReset = Object.keys(this.value)
          .reduce((carry, key) => ({[key]: null, ...carry}), {})
        const cleanVal = val.reduce((carry, option) => {
          if (isString(option)) {
            carry[option] = valueCopy[option]
          } else {
            carry[option.value] = option.label
          }
          return carry
        }, valueReset)
        this.$emit('input', cleanVal)
      },
    },
    cOptions () {
      const { $store, options } = this
      if (isFunction(options)) return options($store)
      if (options.some(o => isString(o))) {
        return options.map(o => ({label: o, value: o}))
      }
      return options.filter(o => !o.disabled)
    }
  },
  methods: {},
}
</script>
