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
            <q-btn
              v-if="deletable"
              @click.stop="tapDelete(pdfIndex)"
              label="削除"
              flat
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
import copy from 'copy-anything'
import { isPlainObject } from 'is-what'
import PdfDialog from '../dialogs/DPdf'
import { QBtn } from 'quasar'

export default {
  components: { QBtn },
  name: 'EfPdf',
  props: {
    value: Array,
    deletable: Boolean,
  },
  computed: {
    cValue: {
      get () {
        const { value } = this
        if (!value) return []
        return value.filter(v => isPlainObject(v))
      },
      set (val) { this.$emit('input', val) },
    },
  },
  methods: {
    tapDelete (index) {
      const newValue = copy(this.value)
      newValue.splice(index, 1)
      this.$emit('input', newValue)
    },
    tap (downloadURL) {
      this.$q.dialog({
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
