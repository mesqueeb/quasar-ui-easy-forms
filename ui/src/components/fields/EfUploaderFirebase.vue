<template>
  <FirebaseUploader
    v-on="$listeners"
    @uploaded="onUploaded"
    :path="path"
    auto-upload
    hide-upload-btn
    :accept="iAccept"
  />
</template>

<style lang="stylus" scoped>
// $
@import '../../index.styl'

// .ef-uploader

</style>

<script>
import merge from 'merge-anything'
import FirebaseUploader from '../FirebaseUploader'

export default {
  components: { FirebaseUploader },
  name: 'EfUploaderFirebase',
  inheritAttrs: false,
  props: {
    // prop categories: behaviour content general model state style
    value: { type: [String, Array, Object] },
    // EF props:
    // Quasar props with modified defaults:
    // Quasar props with modified behaviour:
    path: String,
    fileType: String,
  },
  data () {
    let iAccept
    if (this.fileType === 'image') iAccept = '.jpg, image/*'
    if (this.fileType === 'pdf') iAccept = '.pdf'
    return { iAccept }
  },
  methods: {
    onUploaded (payload) { this.$emit('input', payload) },
  },
}
</script>
