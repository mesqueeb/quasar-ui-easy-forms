<template>
  <div class="ef-img q-gutter-xs">
    <div
      class="_wrapper"
      v-for="(img, imgIndex) in cValue"
      :key="img.downloadURL"
    >
      <q-img :src="img.downloadURL" v-bind="quasarProps" />
      <div class="_nav">
        <EfBtn
          v-if="cDeletable"
          value="削除"
          :push="true"
          @click.stop="tapDelete(imgIndex)"
        />
      </div>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
// $
@import '../../index.styl'

.ef-img
  ._wrapper
    position relative
  ._nav
    position absolute
    top 0
    right 0
    z-index 2

</style>

<script>
import merge from 'merge-anything'
import copy from 'copy-anything'
import { isFullString, isString, isPlainObject } from 'is-what'
import { QBtn } from 'quasar'
import { descriptionImgPdf } from './sharedProps.js'

export default {
  components: { QBtn },
  name: 'EfImg',
  inheritAttrs: false,
  description: descriptionImgPdf,
  props: {
    // prop categories: behaviour content general model state style
    value: [Array, String, Object],
    // EF props:
    deletable: {
      type: Boolean,
      default: true,
      description: 'Wether or not uploaded files are deletable (deleting would update the `value`). `true` by default but `false` when `readonly: true`',
    },
    // Quasar props with modified defaults:
    // Quasar props with modified behaviour:
  },
  computed: {
    quasarProps () {
      return merge(this.$attrs, {
        // Quasar props with modified defaults:
        // Quasar props with modified behaviour:
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
