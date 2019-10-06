<template>
  <EfInput
    class="ef-input-date"
    v-model="cValue"
    v-bind="propsToPass"
  >
    <q-icon name="event" class="cursor-pointer">
      <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
        <q-date
          v-model="cValue"
          :mask="maskForQDate"
          @input="() => $refs.qDateProxy.hide()"
        />
      </q-popup-proxy>
    </q-icon>
  </EfInput>
</template>

<style lang="sass">
// $
@import '../../index.sass'
// .ef-input-date

</style>

<script>
import merge from 'merge-anything'
import { dateStamp } from '../../helpers/dateHelpers'
import { isString, isFullString, isDate } from 'is-what'
import { QIcon, QPopupProxy, ClosePopup, QDate } from 'quasar'
import EfInput from './EfInput.vue'
import { getGenericValueType } from './sharedProps.js'

const defaultMask = 'YYYY/MM/DD'

export default {
  components: { EfInput, QIcon, QPopupProxy, QDate },
  directives: { ClosePopup },
  name: 'EfInputDate',
  inheritAttrs: false,
  desc: `EfInputDate is handy because it automatically returns a date object whenever the user input is as long as the specified \`mask\` and the string can be converted to a valid date instance. Otherwise a string will be returned.`,
  props: merge(EfInput.props, {
    // prop categories: behavior content general model state style
    value: {
      category: 'model',
      type: [String, Date]
    },
    // EF props:
    valueType: merge(
      getGenericValueType(['string', 'date'], `\`valueType: 'date'\` is the default.\nWhen \`valueType: 'date'\` it will try and return a \`new Date\` instance. However, if the user input is not convertable to a valid \`Date\`, it will return the user input as \`string\`.`),
      {default: 'date'}
    ),
    validDateErrorMessage: {
      category: 'behavior',
      type: String,
      desc: 'The error that should be returned for the default "valid date" rule.',
      default: 'Please enter a valid date.',
    },
    // Quasar props with modified defaults:
    fillMask: {quasarProp: 'modified', type: Boolean, default: false},
    // Quasar props with modified behavior:
    mask: {
      quasarProp: 'modified',
      type: String,
      default: defaultMask,
      desc: `Is shown as placeholder. Will be passed as 'input' field mask as well (and converted like so: 'YYYY/MM/DD' → '####/##/##').`,
      examples: [`'YYYY-MM-DD'`, `'MMMM Do, YYYY'`, `'YYYY-MM-DD HH:mm:ss'`],
    },
    rules: {
      quasarProp: 'modified',
      type: Array,
      desc: `When \`valueType: 'date'\`, the default rule will check if the model results to a valid date.`,
      examples: [`[ val => val.length <= 10 || 'Please use maximum 10 characters' ]`],
    },
  }),
  computed: {
    propsToPass () {
      const inheritedProps = Object.keys(EfInput.props)
        .reduce((carry, propKey) => {
          carry[propKey] = this[propKey]
          return carry
        }, {})
      return merge(inheritedProps, this.$attrs, {
        // EF props to pass:
        valueType: 'string', // default to 'string' for underlying input
        // Quasar props with modified defaults:
        // Quasar props with modified behavior:
        mask: this.maskForInput,
        placeholder: this.maskForQDate,
        rules: this.cRules,
      })
    },
    cValue: {
      get () {
        const { value, mask } = this
        // value input has to be a string
        if (isString(value)) return value
        const format = mask
        if (isDate(value)) return dateStamp(value, format)
        return ''
      },
      set (val) {
        const { valueType, mask } = this
        // @input will always return a string
        if (valueType !== 'date') return this.$emit('input', val)
        // if the value is shorter than the format, return value as is
        const format = mask
        if (val.length < format.length) return this.$emit('input', val)
        // if valueType is a date, try returning a date only if it's a valid date
        const dateVal = new Date(val)
        const newVal = !isDate(dateVal) ? val : dateVal
        this.$emit('input', newVal)
      },
    },
    maskForInput () {
      // When no mask is defined, return default mask
      if (!isFullString(this.mask)) return defaultMask.replace(/\w/g, '#')
      // Convert the mask in "date" format to a mask in "input" format.
      // Eg. 'YYYY-MM-DD' → '####-##-##'
      // Don't pass masks with '[' because there's no clear way to create a mask from this.
      if (this.mask.includes('[')) return undefined
      return this.mask.replace(/\w/g, '#')
    },
    maskForQDate () { return this.mask },
    cRules () {
      const { value, valueType, mask, rules, validDateErrorMessage } = this
      const format = mask
      function defaultRule () {
        const validDate = (
          !value ||
          (valueType === 'date' && isDate(value)) ||
          (valueType === 'string' && value.length >= format.length)
        )
        return validDate || validDateErrorMessage
      }
      return !rules ? [defaultRule] : rules
    },
  },
  methods: {},
}
</script>
