<template>
  <div class="ef-slider">
    <q-slider
      v-model="cValue"
      :min="min"
      :max="max"
      :step="step"
      label
      label-always
      :label-value="cFormat(cValue)"
      markers
      :disable="disable"
    />
  </div>
</template>

<style lang="stylus" scoped>
// $
@import '../../index.styl'

.ef-slider
  pt 30px
  px md

</style>

<script>
import { isFunction } from 'is-what'
import { QSlider } from 'quasar'

export default {
  components: { QSlider },
  name: 'EfSlider',
  props: {
    value: Number,
    min: Number,
    max: Number,
    step: Number,
    format: Function,
    suffix: String,
    prefix: String,
    disable: Boolean,
  },
  computed: {
    cValue: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      },
    },
  },
  methods: {
    cFormat (val) {
      const { format, prefix, suffix } = this
      if (isFunction(format)) val = format(val)
      if (prefix) val = `${prefix}${val}`
      if (suffix) val = `${val}${suffix}`
      return val
    },
  }
}
</script>
