<template>
  <EfInput
    class="ef-input-date"
    :big="big"
    v-model="cValue"
    :mask="maskForInput"
    valueType="string"
    :disable="disable"
    :view-mode="viewMode"
    :placeholder="maskForQDate"
    :rules="cRules"
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
import {
  dateStamp,
  // timeStamp,
  // makeDateFromStamps
} from '../../helpers/dateHelpers'
import { isString, isFullString, isDate } from 'is-what'

const defaultMask = 'YYYY/MM/DD'

export default {
  name: 'EfInputDate',
  props: {
    value: [String, Date],
    valueType: String,
    type: String,
    mask: String,
    big: Boolean,
    disable: Boolean,
    viewMode: Boolean,
    rules: Array,
  },
  computed: {
    cValue: {
      get () {
        const { value } = this
        // value input has to be a string
        if (isString(value)) return value
        const format = this.mask || defaultMask
        if (isDate(value)) return dateStamp(value, format)
        return ''
      },
      set (val) {
        // @input will always return a string
        if (this.valueType !== 'date') return this.$emit('input', val)
        // if the value is shorter than the format, return value as is
        const format = this.mask || defaultMask
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
    maskForQDate () { return this.mask || defaultMask },
    cRules () {
      const { value, valueType, mask, rules } = this
      const format = mask || defaultMask
      function defaultRule () {
        const validDate = (
          !value ||
          (valueType === 'date' && isDate(value)) ||
          (valueType === 'string' && value.length >= format.length)
        )
        return validDate || '正確な日付を記入してきださい。'
      }
      return !rules ? [defaultRule] : rules
    },
  },
  methods: {},
}
</script>
