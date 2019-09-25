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

<style lang="stylus">
// $
@import '../../index.styl'
// .ef-input-date

</style>

<script>
import merge from 'merge-anything'
import {
  dateStamp,
  // timeStamp,
  // makeDateFromStamps
} from '../../helpers/dateHelpers'
import { isString, isFullString, isDate } from 'is-what'

import { date, QIcon, QPopupProxy, ClosePopup, QDate } from 'quasar'
const { formatDate, adjustDate } = date

const defaultMask = 'YYYY/MM/DD'

// console.log('formatDate(value, format) → ', formatDate(new Date(), 'YYYY/MM/DD'))

export default {
  components: { QIcon, QPopupProxy, QDate },
  directives: { ClosePopup },
  name: 'EfInputDate',
  props: {
    // prop categories: behaviour content general model state style
    value: [String, Date],
    // EF props:
    valueType: {
      category: 'model',
      type: String,
      validator: val => ['string', 'date'].includes(val),
      examples: ['string', 'date'],
      default: 'string',
      description: 'When `valueType: \'date\'` it will try and return a `new Date` instance. However, if the user input does not provide a valid `Date`, it will return the user input as `string`.',
    },
    validDateErrorMessage: {
      category: 'behaviour',
      type: String,
      description: 'The error that should be returned for the default "valid date" rule. Defaults to "Please enter a valid date."',
      default: 'Please enter a valid date.',
    },
    // format: {type: Function}, // fix the "commafy" problem first
    // Quasar props with modified defaults:
    // Quasar props with modified behaviour:
    mask: {
      quasarProp: true,
      type: String,
      default: defaultMask,
      examples: ['YYYY-MM-DD', 'MMMM Do, YYYY', 'YYYY-MM-DD HH:mm:ss'],
      description: 'Default: \'YYYY/MM/DD\'. Will automatically convert the Date mask to the underlying input mask like so: \'YYYY/MM/DD\' → \'####/##/##\'',
    },
    rules: {
      quasarProp: true,
      type: Array,
      examples: ['[ val => val.length <= 10 || \'Please use maximum 10 characters\' ]'],
      description: 'When `valueType: \'date\'`, the default rule will check if the model results to a valid date.',
    },
  },
  computed: {
    propsToPass () {
      return merge(this.$attrs, {
        // EF props to pass:
        valueType: 'string', // default to 'string' for underlying input
        // Quasar props with modified defaults:
        // Quasar props with modified behaviour:
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
        console.log('mask → ', mask)
        const format = mask
        console.log('value, format → ', value, format)
        console.log('formatDate(value, format) → ', formatDate(value, format))
        console.log('dateStamp(value, format) → ', dateStamp(value, format))
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
