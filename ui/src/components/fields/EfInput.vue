<template>
  <q-input
    :class="[
      'ef-input',
      `-align-${cAlign}`, {
      '-big': big,
    }]"
    v-model="cValue"
    v-bind="quasarProps"
    v-on="events"
    @keydown="onKeydown"
    @keyup="onKeyup"
    @click="onClick"
    @focus="onFocus"
    @blur="onBlur"
  >
    <template v-slot:append>
      <slot />
    </template>
  </q-input>
</template>

<style lang="sass">
// $
@import '../../index.sass'

.ef-input
  width: 100%
  .q-field__control
    border-radius: $md
    height: initial // textareaをinputに統一
  .q-field__control-container
    padding-top: 2px // textareaをinputに統一
    padding-bottom: 2px // textareaをinputに統一
  .q-field__control:before
    border: 3px $primary solid !important
  .q-field__suffix
    color: $text--dark
    padding-top: 6px // textareaをinputに統一
    padding-bottom: 6px // textareaをinputに統一
  .q-field__native
    color: $text--dark
    min-height: 52px // textareaをinputに統一
    > span
      width: 100%
  &.-big
    font-size: 25px
    textarea.q-field__native // only on textarea
      padding-top: .45em
    .q-field__control
      padding-top: .4em !important
      padding-bottom: .4em !important
    .q-field__control:before
      border: 6px $primary solid !important
    .q-field__native
      line-height: 1.2 !important
  &.-align-right
    .q-field__native
      text-align: right
  &.q-field--disabled
    .q-field__control
      background: $gray-bg
      > div
        opacity: 1 !important
    .q-field__control:before
      border: none !important
  &.q-field--readonly
    .q-field__control:before
      border: 1px $gray-bg--dark solid !important
    .q-field__control > div
      opacity: 1 !important
  &.q-textarea
    .q-field__native
      line-height: 1.8
      padding-top: 15px
      padding-bottom: 12px

</style>

<script>
import merge from 'merge-anything'
import { isNumber, isString, isArray, isFunction } from 'is-what'
import { QInput } from 'quasar'
import { big, getGenericValueType } from './sharedProps.js'
import { rulesMap } from '../../helpers/inputValidators'
import focusInput from '../../helpers/focusInput'

export default {
  components: { QInput },
  name: 'EfInput',
  inheritAttrs: false,
  props: {
    // prop categories: behavior content general model state style
    value: {
      category: 'model',
      type: [String, Number]
    },
    valueType: getGenericValueType(['string', 'number'], `When \`valueType: 'number'\` it will make sure the model is formatted as Number.`),
    // EF props:
    fieldType: {type: String}, // defined in EasyField
    big,
    maxValue: {
      category: 'model',
      type: Number,
      descripton: '(only for `valueType: \'number\'`) limit the max number to be entered. Typing or pasting a higher number will set it to the maxValue.',
      examples: [999]
    },
    align: {
      category: 'style',
      validator: val => (!val || ['right', 'left', null].includes(val)),
      type: String,
      desc: `Alignment of the content. Defaults to 'right' for \`valueType: 'number'\` and 'left' for the rest'`,
      values: ['right', 'left', null],
      examples: [`'right'`, `'left'`, null],
    },
    events: {
      category: 'behavior',
      type: Object,
      desc: 'An Object with an event name as key and the handler function as value. The function you pass will receive the native event payload as first parameter and the current value as second: ($event, val) => {}',
      default: () => ({}),
      examples: ['{click: console.log, input: console.log}', '{blur: (event, val) => console.log(val)}'],
    },
    // format: {type: Function}, // fix the "commafy" problem first
    // Quasar props with modified defaults:
    lazyRules: { quasarProp: 'modified', type: Boolean, default: true },
    outlined: { quasarProp: 'modified', type: Boolean, default: true },
    // Quasar props with modified behavior:
    rules: {
      quasarProp: 'modified',
      type: Array,
      desc: 'Same as Quasar, but with added pre-defined rules for \'telJA\' and \'email\'',
      examples: [`['telJA']`, `['email']`, `[ val => val.length <= 3 || 'Please use maximum 3 characters' ]`],
    },
    type: {
      quasarProp: 'modified',
      type: String,
      descripton: `The html tag input type. Defaults to 'number' if \`valueType: 'number'\`, otherwise defaults to 'text'.`,
      default: 'text',
      examples: [`'text'`, `'password'`, `'textarea'`, `'email'`, `'search'`, `'tel'`, `'file'`, `'number'`, `'url'`, `'time'`, `'date'`],
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
        // Quasar props with modified behavior:
        rules: this.cRules,
        type: this.cType,
      })
    },
    cValue: {
      get () {
        const { value, valueType } = this
        if (value !== 0 && !value) return ''
        // commafy doesn't work with type="number"
        return (valueType === 'number')
          ? Number(value)
          : value
      },
      set (val) {
        const { maxValue, valueType, executeEvent } = this
        if (val !== '' && valueType === 'number' && isString(val)) {
          val = Number(val.replace(/,/g, ''))
        }
        if (isNumber(val) && isNumber(maxValue)) {
          if (val > maxValue) {
            // first emit val then maxValue because otherwise the vue component won't rerender
            executeEvent('input', val)
            this.$nextTick(() => executeEvent('input', maxValue))
            return
          }
        }
        executeEvent('input', val)
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
      const { align, valueType } = this
      if (align) return align
      return valueType === 'number' ? 'right' : 'left'
    },
    isMaxValue () {
      const { value, maxValue } = this
      return isNumber(maxValue) && value === maxValue
    },
    cRules () {
      const { rules } = this
      if (!isArray(rules)) return undefined
      return rules.map(rule => {
        if (isString(rule) && rulesMap[rule]) return rulesMap[rule]
        return rule
      })
    },
  },
  methods: {
    executeEvent (eventName, event) {
      const { events, cValue } = this
      const evts = events || {}
      const fn = evts[eventName]
      if (isFunction(fn)) fn(event, cValue)
      this.$emit(eventName, event)
    },
    onClick (event) {
      focusInput(event)
      this.executeEvent('click', event)
    },
    onKeydown (event) {
      const { isMaxValue } = this
      if (isMaxValue && event && isNumber(Number(event.key))) {
        event.preventDefault()
        event.stopPropagation()
        return
      }
      this.executeEvent('keydown', event)
    },
    onKeyup (event) { this.executeEvent('keyup', event) },
    onFocus (event) { this.executeEvent('focus', event) },
    onBlur (event) { this.executeEvent('blur', event) },
  }
}
</script>
