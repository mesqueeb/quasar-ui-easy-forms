<template>
  <EfDiv
    v-if="rawValue"
    class="ef-input"
    v-bind="divProps"
  />
  <q-input
    v-else
    :class="[
      'ef-input',
      `-align-${cAlign}`,
      `ef-input--align-${cAlign}`, {
      '-big': big,
    }]"
    v-model="cValue"
    v-bind="quasarProps"
    v-on="cEvents"
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
.ef-input--align-right
  .q-field__native
    text-align: right

</style>

<script>
import merge from 'merge-anything'
import { isNumber, isString, isArray, isFunction } from 'is-what'
import { QInput } from 'quasar'
import { getGenericValueType, big, externalLabels } from './sharedProps.js'
import { rulesMap } from '../../helpers/inputValidators'
import focusIfInputEl from '../../helpers/focusIfInputEl'

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
    rawValue: {type: Boolean}, // requires these props for EfDiv: valueType, suffix, prefix, options, multiple
    fieldType: {type: String}, // defined in EasyField
    big,
    externalLabels,
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
    // Quasar props with modified defaults:
    lazyRules: { inheritedProp: 'modified', type: Boolean, default: true },
    outlined: { inheritedProp: 'modified', type: Boolean, default: true },
    // Quasar props with modified behavior:
    rules: {
      inheritedProp: 'modified',
      type: Array,
      desc: 'Same as Quasar, but with added pre-defined rules for \'telJA\' and \'email\'',
      examples: [`['telJA']`, `['email']`, `[ val => val.length <= 3 || 'Please use maximum 3 characters' ]`],
    },
    type: {
      inheritedProp: 'modified',
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
      const overWriteLabelAndHint = (this.externalLabels === false)
        ? {
          label: this.$attrs.labelRaw,
          hint: this.$attrs.subLabelRaw,
        } : {}
      return merge(this.$attrs, {
        // Quasar props with modified defaults:
        outlined: this.outlined,
        lazyRules: this.lazyRules,
        // Quasar props with modified behavior:
        rules: this.cRules,
        type: this.cType,
      }, overWriteLabelAndHint)
    },
    divProps () {
      return merge(this.$attrs, {
        value: this.value,
        valueType: this.valueType,
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
        const { maxValue, valueType } = this
        if (val !== '' && valueType === 'number' && isString(val)) {
          val = Number(val.replace(/,/g, ''))
        }
        if (isNumber(val) && isNumber(maxValue)) {
          if (val > maxValue) {
            // first emit val then maxValue because otherwise the vue component won't rerender
            this.$emit('input', val)
            this.$nextTick(() => this.$emit('input', maxValue))
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
    cEvents () {
      const { onClick, onKeydown, $listeners } = this
      return Object.entries($listeners)
        .reduce((carry, [eventName, eventFn]) => {
          // input event is handled in cValue
          if (eventName === 'input') return carry
          if (eventName === 'click') {
            carry[eventName] = (...args) => { onClick(...args); eventFn(...args) }
          } else if (eventName === 'keydown') {
            carry[eventName] = (...args) => { onKeydown(...args); eventFn(...args) }
          } else {
            carry[eventName] = eventFn
          }
          return carry
        }, {
          click: onClick,
          keydown: onKeydown,
        })
    },
  },
  methods: {
    onClick (event) {
      focusIfInputEl(event)
    },
    onKeydown (event) {
      const { isMaxValue } = this
      if (isMaxValue && event && isNumber(Number(event.key))) {
        event.preventDefault()
        event.stopPropagation()
        return
      }
    },
  }
}
</script>
