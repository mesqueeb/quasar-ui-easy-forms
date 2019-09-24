<template>
<q-dialog ref="dialog" @hide="onDialogHide" maximized>
  <div class="d-pdf">
    <q-btn
      icon="close"
      color="primary"
      class="_close-btn"
      round
      size="25px"
      @click.stop="Ok"
    />
    <div class="_loading">
      <q-spinner size="20vw" color="primary" />
    </div>
    <q-pdfviewer
      :value="true"
      :src="src"
      :error="onError"
      :load="onLoad"
      content-class="_container"
      inner-content-class="fit"
    />
  </div>
</q-dialog>
</template>

<style lang="stylus" scoped>
// $
@import '../../index.styl'

.d-pdf
  background white
  position relative
._container
  top 0
  position absolute
._close-btn
  position fixed
  z-index 2
  top 25px
  right 25px
._loading
  width 100vw
  height 100vh
  display flex
  flex-wrap wrap
  flex-direction column
  justify-content center
  align-items center

</style>

<script>
import QDialogMethods from '../mixins/QDialogMethods'
import { QDialog, QBtn, QSpinner } from 'quasar'

export default {
  components: { QDialog, QBtn, QSpinner },
  name: 'DPdf',
  mixins: [ QDialogMethods ],
  props: {
    src: String,
  },
  computed: {},
  methods: {
    onError () {
      console.log('@ERROR', 'but this is not executed......')
    },
    onLoad () {
      console.log('@LOAD', 'but this is not executed......')
    },
  }
}
</script>
