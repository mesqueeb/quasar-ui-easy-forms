<template>
  <div class="ef-img q-gutter-xs">
    <div
      class="_wrapper"
      v-for="(img, imgIndex) in cValue"
      :key="img.downloadURL"
    >
      <img :src="img.downloadURL" />
      <div class="_nav">
        <q-btn
          v-if="deletable"
          label="削除"
          class="my-q-btn--small _btn"
          push
          @click="tapDelete(imgIndex)"
        />
      </div>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
// $
@import '../../index.styl'

.ef-img
  img
    max-width 100%
  ._wrapper
    position relative
  ._nav
    position absolute
    top 0
    right 0
    z-index 2

</style>

<script>
import copy from 'copy-anything'
import { isFullString, isString, isPlainObject } from 'is-what'
import { QBtn } from 'quasar'

export default {
  components: { QBtn },
  name: 'EfImg',
  props: {
    value: [Array, String],
    deletable: Boolean,
    disable: Boolean,
  },
  computed: {
    cValue: {
      get () {
        const { value } = this
        if (!value) return []
        if (isFullString(value)) return [{downloadURL: value}]
        return value.filter(v => isPlainObject(v))
      },
      set (val) { this.$emit('input', val) },
    },
  },
  methods: {
    tapDelete (index) {
      if (isString(this.value)) return this.$emit('input', '')
      const newValue = copy(this.value)
      newValue.splice(index, 1)
      this.$emit('input', newValue)
    },
  }
}
</script>
