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
              :btnLabel="lang.delete"
              :flat="true"
              color="negative"
            />
          </div>
        </li>
      </a>
    </ul>
  </div>
</template>

<style lang="sass">
// $
@import '../../index.sass'

// .ef-pdf
</style>

<script>
import merge from 'merge-anything'
import copy from 'copy-anything'
import { isString, isPlainObject, isFullString } from 'is-what'
import { QDialog, Dialog } from 'quasar'
import EfBtn from './EfBtn.vue'
import PdfDialog from '../dialogs/DPdf.vue'
import { valueDescImgPdf, getGenericValueType, passContentViaValueOrSrc } from './sharedProps.js'

export default {
  components: { QDialog, EfBtn },
  name: 'EfPdf',
  inheritAttrs: false,
  desc: `For the time being you need to **manually** add the quasar plugin 'Dialog' and the ui element 'q-pdf-viewer':

1. Add \`'Dialog'\` to the \`plugins\` section of \`quasar.conf.js\`
2. Install \`q-pdf-viewer\` like so:
\`\`\`bash
quasar ext add @quasar/qpdfviewer
\`\`\`

${passContentViaValueOrSrc}`,
  props: {
    // prop categories: behavior content general model state style
    value: {
      category: 'model',
      type: [String, Array, Object],
      desc: valueDescImgPdf,
    },
    get src () {
      return this.value
    },
    valueType: getGenericValueType(['string', 'object', 'array']),
    // EF props:
    rawValue: { type: Boolean }, // requires these props for EfDiv: valueType, suffix, prefix, options, multiple
    deletable: {
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
        const { value, src } = this
        const val = value || src
        if (!val) return []
        if (isPlainObject(val)) return [val]
        if (isFullString(val)) {
          const fileName =
            val
              .split('/')
              .slice(-1)[0]
              .split('.pdf')[0] + '.pdf'
          return [{ downloadURL: val, fileName }]
        }
        return val.filter(v => isPlainObject(v))
      },
      set (val) {
        this.$emit('input', val)
      },
    },
    cDeletable () {
      const { deletable, quasarProps, rawValue } = this
      if (quasarProps.readonly || rawValue) return false
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
  },
}
</script>
