<template>
  <div class="ef-img q-gutter-xs">
    <div
      class="ef-img__wrapper"
      v-for="(img, imgIndex) in cValue"
      :key="img.downloadURL"
    >
      <q-img
        :src="img.downloadURL"
        v-bind="quasarProps"
        v-on="$listeners"
      />
      <div class="ef-img__nav">
        <EfBtn
          v-if="cDeletable"
          :disable="quasarProps.disable"
          value="削除"
          :push="true"
          @click.stop="tapDelete(imgIndex)"
        />
      </div>
    </div>
  </div>
</template>

<style lang="sass">
// $
@import '../../index.sass'

.ef-img
  .ef-img__wrapper
    position: relative
  .ef-img__nav
    position: absolute
    top: 0
    right: 0
    z-index: 2

</style>

<script>
import merge from 'merge-anything'
import copy from 'copy-anything'
import { isFullString, isString, isPlainObject } from 'is-what'
import { QImg } from 'quasar'
import EfBtn from './EfBtn.vue'
import { valueDescImgPdf, getGenericValueType } from './sharedProps.js'

export default {
  components: { EfBtn, QImg },
  name: 'EfImg',
  inheritAttrs: false,
  props: {
    // prop categories: behavior content general model state style
    value: {
      category: 'model',
      type: [Array, String, Object],
      desc: valueDescImgPdf,
    },
    valueType: getGenericValueType(['string', 'object', 'array']),
    // EF props:
    deletable: {
      category: 'behavior',
      type: Boolean,
      default: true,
      desc: 'Wether or not uploaded files are deletable (deleting would update the `value`). `true` by default but `false` when `readonly: true`',
    },
    // Quasar props with modified defaults:
    // Quasar props with modified behavior:
  },
  computed: {
    quasarProps () {
      return merge(this.$attrs, {
        // Quasar props with modified defaults:
        // Quasar props with modified behavior:
      })
    },
    cValue: {
      get () {
        const { value } = this
        if (!value) return []
        if (isPlainObject(value)) return [value]
        if (isFullString(value)) return [{downloadURL: value}]
        return value.filter(v => isPlainObject(v))
      },
      set (val) { this.$emit('input', val) },
    },
    cDeletable () {
      const { deletable, quasarProps } = this
      if (quasarProps.readonly) return false
      return deletable
    },
  },
  methods: {
    tapDelete (index) {
      const { value } = this
      if (isString(value)) return this.$emit('input', '')
      if (isPlainObject(value)) return this.$emit('input', {})
      const newValue = copy(value)
      newValue.splice(index, 1)
      this.$emit('input', newValue)
    },
  }
}
</script>
