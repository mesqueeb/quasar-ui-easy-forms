<template>
  <div class="ef-img q-gutter-xs">
    <div class="ef-img__wrapper" v-for="(img, imgIndex) in cValue" :key="img.downloadURL">
      <q-img :src="img.downloadURL" v-bind="quasarProps" v-on="$listeners">
        <div v-if="img.caption" :class="img.captionClasses" :style="img.captionStyle">
          {{ img.caption }}
        </div>
      </q-img>
      <div class="ef-img__nav">
        <EfBtn
          v-if="cDeletable"
          :disable="quasarProps.disable"
          :btnLabel="lang.delete"
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
import { isFullString, isString, isPlainObject, isNumber, isArray } from 'is-what'
import { QImg } from 'quasar'
import EfBtn from './EfBtn.vue'
import { valueDescImgPdf, getGenericValueType, passContentViaValueOrSrc } from './sharedProps.js'

export default {
  desc: `The useful thing about EasyField image is that you can pass one _or_ multiple images. You can then limit the amout you want to show via the \'limit\' prop.

Captions can be passed via the model as well, and each image can have its own caption: Eg. \`v-model="[{downloadURL, caption}]"\`
Classes and/or style can be applied to the captions as well via \`captionStyle\` and \`captionClasses\`.

${passContentViaValueOrSrc}`,
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
    get src () {
      return this.value
    },
    valueType: getGenericValueType(['string', 'object', 'array']),
    limit: {
      category: 'content|model',
      type: Number,
      desc: 'Limit the number of images shown when there are multiple',
    },
    // EF props:
    deletable: {
      category: 'behavior',
      type: Boolean,
      default: true,
      desc:
        'Wether or not uploaded files are deletable (deleting would update the `value`). `true` by default but `false` when `readonly: true`',
    },
    lang: {
      category: 'content',
      type: Object,
      desc: `The text used in the UI, eg. for required fields, etc.`,
      default: () => ({ delete: 'Delete' }),
      examples: [`{delete: '削除'}`],
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
        const { value, limit, src } = this
        const val = value || src
        if (!val) return []
        const valArray = isArray(val) ? val : [val]
        const result = valArray.map(v => {
          if (isFullString(v)) return { downloadURL: v }
          return v
        })
        if (isNumber(limit)) return result.slice(0, limit)
        return result
      },
      set (val) {
        this.$emit('input', val)
      },
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
  },
}
</script>
