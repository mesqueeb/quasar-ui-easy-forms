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
              :disable="quasarProps.disable"
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
import { isString, isPlainObject, isFullString } from 'is-what'
import { QDialog, Dialog } from 'quasar'
import EfBtn from './EfBtn.vue'
import PdfDialog from '../dialogs/DPdf.vue'
import { valueDescImgPdf, getGenericValueType } from './sharedProps.js'

export default {
  components: { QDialog, EfBtn },
  name: 'EfPdf',
  inheritAttrs: false,
  desc: `For the time being you need to **manually** add the quasar plugin 'Dialog' and the ui element 'q-pdf-viewer':

1. Add \`'Dialog'\` to the \`plugins\` section of \`quasar.conf.js\`
2. Install \`q-pdf-viewer\` like so:
\`\`\`bash
quasar ext add @quasar/qpdfviewer
\`\`\``,
  props: {
    // prop categories: behavior content general model state style
    value: {
      category: 'model',
      type: [String, Array, Object],
      desc: valueDescImgPdf,
    },
    valueType: getGenericValueType(['string', 'object', 'array']),
    // EF props:
    deletable: {
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
