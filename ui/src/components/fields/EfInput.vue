<template>
  <q-input
    :class="[
      'ef-input',
      `-align-${cAlign}`, {
      '-big': big,
    }]"
    v-model="cValue"
    v-bind="quasarProps"

    @keydown="onKeydown"
    @keyup="onKeyup"
    @click="onClick"
    @focus="focussed = true"
    @blur="focussed = false"
  >
    <template v-slot:append>
      <slot />
    </template>
  </q-input>
</template>

<style lang="stylus">
// $
@import '../../index.styl'

.ef-input
  width 100%
  .q-field__control
    border-radius md
    height initial // textareaをinputに統一
  .q-field__control-container
    py 2px // textareaをinputに統一
  .q-field__control:before
    border 3px $primary solid !important
  .q-field__suffix
    color $text--dark
    py 6px // textareaをinputに統一
  .q-field__native
    color $text--dark
    min-height 52px // textareaをinputに統一
    > span
      width 100%
  &.-big
    font-size 25px
    textarea.q-field__native // only on textarea
      pt .45em
    .q-field__control
      py .4em !important
    .q-field__control:before
      border 6px $primary solid !important
    .q-field__native
      line-height 1.2 !important
  &.-align-right
    .q-field__native
      text-align right
  // &.q-field--disabled
  //   .q-field__control
  //     background $gray-bg
  //     > div
  //       opacity 1 !important
  //   .q-field__control:before
  //     border none !important
  // &.q-field--readonly
  //   .q-field__control:before
  //     border 1px $gray-bg--dark solid !important
  //   .q-field__control > div
  //     opacity 1 !important
  &.q-textarea
    .q-field__native
      line-height 1.8
      padding-top 15px
      padding-bottom 12px

</style>

<script>
import merge from 'merge-anything'
import { isNumber, isString, isArray } from 'is-what'
import { QInput } from 'quasar'
import { big } from './sharedProps.js'
import { rulesMap } from '../../helpers/inputValidators'
import focusInput from '../../helpers/focusInput'

export default {
  components: { QInput },
  name: 'EfInput',
  inheritAttrs: false,
  props: {
    // prop categories: behaviour content general model state style
    value: [String, Number],
    // EF props:
    valueType: String, // defined in EasyField
    fieldType: String, // defined in EasyField
    big,
    maxValue: {
      type: Number,
      descripton: '(only for `valueType: \'number\'`) limit the max number to be entered. Typing or pasting a higher number will set it to the maxValue.',
      examples: [999]
    },
    align: {
      type: String,
      description: 'Alignment of the content. Defaults to right for `valueType: \'number\'` and left for the rest',
      examples: ['right', 'left']
    },
    // format: {type: Function}, // fix the "commafy" problem first
    // Quasar props with modified defaults:
    lazyRules: {
      type: Boolean,
      quasarProp: true,
      default: true
    },
    outlined: {
      type: Boolean,
      quasarProp: true,
      default: true
    },
    // Quasar props with modified behaviour:
    rules: {
      type: Array,
      quasarProp: true,
      description: 'Same as Quasar, but with added pre-defined rules for \'telJA\' and \'email\'',
      examples: ['telJA', 'email', '[ val => val.length <= 3 || \'Please use maximum 3 characters\' ]'],
    },
    type: {
      type: String,
      quasarProp: true,
      descripton: 'The html tag input type. Defaults to \'number\' if `valueType: \'number\'`, otherwise defaults to \'text\'.',
      default: 'text',
      examples: ['text', 'password', 'textarea', 'email', 'search', 'tel', 'file', 'number', 'url', 'time', 'date'],
    },
  },
  data () {
    return { focussed: false }
  },
  computed: {
    quasarProps () {
      return merge(this.$attrs, {
        // Quasar props with modified defaults:
        outlined: this.outlined,
        lazyRules: this.lazyRules,
        // Quasar props with modified behaviour:
        rules: this.cRules,
        type: this.cType,
      })
    },
    cValue: {
      get () {
        if (this.value !== 0 && !this.value) return ''
        // commafy doesn't work with type="number"
        return (this.valueType === 'number')
          ? Number(this.value)
          : this.value
      },
      set (val) {
        if (val !== '' && this.valueType === 'number' && isString(val)) {
          val = Number(val.replace(/,/g, ''))
        }
        if (isNumber(val) && isNumber(this.maxValue)) {
          if (val > this.maxValue) {
            // first emit val then maxValue because otherwise the vue component won't rerender
            this.$emit('input', val)
            this.$nextTick(_ => this.$emit('input', this.maxValue))
            return
          }
        }
        this.$emit('input', val)
      },
    },
    cType () {
      const { type, valueType, fieldType } = this
      if (isString(type)) return type
      if (valueType === 'number') return 'number'
      if (fieldType === 'textarea') return 'textarea'
      return 'text'
    },
    cAlign () {
      if (this.align) return this.align
      return this.valueType === 'number' ? 'right' : 'left'
    },
    isMaxValue () {
      return isNumber(this.maxValue) && this.value === this.maxValue
    },
    cRules () {
      if (!isArray(this.rules)) return undefined
      return this.rules.map(rule => {
        if (isString(rule) && rulesMap[rule]) return rulesMap[rule]
        return rule
      })
    },
  },
  methods: {
    onClick (event) {
      this.$emit('click', event)
      focusInput(event)
    },
    onKeyup (event) {
      this.$emit('keyup', event)
    },
    onKeydown (event) {
      if (this.isMaxValue && event && isNumber(Number(event.key))) {
        event.preventDefault()
        event.stopPropagation()
        return
      }
      this.$emit('keydown', event)
    },
  }
}
</script>
