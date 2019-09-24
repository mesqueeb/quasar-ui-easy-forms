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
import FirebaseUploader from '../FirebaseUploader'

export default {
  components: { FirebaseUploader },
  name: 'EfUploaderFirebase',
  props: {
    path: String,
    fileType: String,
    value: { type: [String, Array, Object] },
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
