<template>
  <div class="ef-pdf q-gutter-xs">
    <ul>
      <a
        class="cursor-pointer"
        v-for="(pdf, pdfIndex) in cValue"
        :key="pdf.fileName"
        @click="tap(pdf.downloadURL)"
      >
        <li class="my-link">
          <div class="flex justify-between items-center">
            <div>{{ pdf.fileName }}</div>
            <EfBtn
              v-if="cDeletable"
              @click.stop="tapDelete(pdfIndex)"
              value="削除"
              :flat="true"
              color="negative"
            />
          </div>
        </li>
      </a>
    </ul>
  </div>
</template>

<style lang="stylus" scoped>
// $
@import '../../index.styl'

// .ef-pdf

</style>

<script>
import merge from 'merge-anything'
import copy from 'copy-anything'
import { isPlainObject, isFullString } from 'is-what'
import { QBtn, QDialog, Dialog } from 'quasar'
import PdfDialog from '../dialogs/DPdf'
import { descriptionImgPdf } from './sharedProps.js'

export default {
  components: { QBtn, QDialog },
  name: 'EfPdf',
  inheritAttrs: false,
  description: descriptionImgPdf,
  props: {
    // prop categories: behaviour content general model state style
    value: [String, Array, Object],
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
        if (isFullString(value)) {
          const fileName = value.split('/').slice(-1)[0].split('.pdf')[0] + '.pdf'
          return [{downloadURL: value, fileName}]
        }
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
    tap (downloadURL) {
      Dialog.create({
        component: PdfDialog,
        src: downloadURL,
        root: this.$root,
        $store: this.$store,
        $q: this.$q,
      })
    },
  }
}
</script>
