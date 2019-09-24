<template>
  <div class="ef-range">
    <q-range
      v-model="cValue"
      :min="min"
      :max="max"
      :step="step"
      label-always
      label
      :left-label-value="cFormat(cValue.min)"
      :right-label-value="cFormat(cValue.max)"
      :disable="disable"
    />
  </div>
</template>

<style lang="stylus" scoped>
// $
@import '../../index.styl'

.ef-range
  pt 30px
  px md

</style>

<script>
import { isObject, isFunction } from 'is-what'
import { QRange } from 'quasar'

export default {
  components: { QRange },
  name: 'EfRange',
  props: {
    value: Object,
    min: Number,
    max: Number,
    step: Number,
    format: Function,
    disable: Boolean,
  },
  computed: {
    cValue: {
      get () {
        if (!isObject(this.value)) throw new Error('SRange value needs to be an object like {min: 0, max: 10}')
        const { from, to } = this.value
        if (from !== undefined) return {min: from, max: to}
        return this.value
      },
      set (val) {
        const { from } = this.value
        if (from !== undefined) val = {from: val.min, to: val.max}
        this.$emit('input', val)
      },
    },
  },
  methods: {
    cFormat (val) {
      if (!isFunction(this.format)) return val
      return this.format(val)
    },
  }
}
</script>
