<template>
  <QUploaderFirebase
    v-on="$listeners"
    @uploaded="onUploaded"
    v-bind="propsToPass"
  />
</template>

<style lang="sass">
// $
@import '../../index.sass'

// .ef-uploader

</style>

<script>
import merge from 'merge-anything'
import QUploaderFirebase from '../QUploaderFirebase'

export default {
  components: { QUploaderFirebase },
  name: 'EfUploaderFirebase',
  inheritAttrs: false,
  props: {
    // prop categories: behavior content general model state style
    value: {
      category: 'model',
      type: [Array, Object],
      desc: 'No `value` needs to be set for UploaderFirebase. However an @input event will be triggered which receives an object as payload with the information on where the image was stored.',
    },
    // EF props:
    firebaseDependency: {
      category: 'upload',
      type: Object,
      desc: `Since this is an uploader specific for Firebase, a Firebase dependency must be passed. If none is passed it will search for Firebase at \`window.firebase\`. If no firebase instance can be found, an error will be thrown.

Don't forget to also import Firebase storage like so: \`import 'firebase/storage'\``,
    },
    path: {
      category: 'upload',
      type: String,
      desc: 'This should be the Firebase storage path where files should be uploaded to.',
      required: true,
    },
    fileType: {
      category: 'behavior',
      type: String,
      desc: 'The file type the uploader can accept. Currently limited to \'image\' or \'pdf\'. This will automatically limit the uploader to those file types via Quasar\'s `accept` prop.',
      values: ['image', 'pdf'],
    },
    // Quasar props with modified defaults:
    autoUpload: {
      type: Boolean,
      default: true,
      inheritedProp: 'modified',
    },
    hideUploadBtn: {
      type: Boolean,
      default: true,
      inheritedProp: 'modified',
    },
    // Quasar props with modified behavior:
    accept: {
      inheritedProp: true,
    },
  },
  data () {
    const { accept, fileType } = this
    let defaultAccept
    if (fileType === 'image') defaultAccept = '.jpg, image/*'
    if (fileType === 'pdf') defaultAccept = '.pdf'
    return { iAccept: accept || defaultAccept }
  },
  computed: {
    propsToPass () {
      return merge(this.$attrs, {
        path: this.path,
        firebaseDependency: this.firebaseDependency,
        // Quasar props with modified defaults:
        autoUpload: this.autoUpload,
        hideUploadBtn: this.hideUploadBtn,
        // Quasar props with modified behavior:
        accept: this.iAccept,
      })
    },
  },
  methods: {
    onUploaded (payload) { this.$emit('input', payload) },
  },
}
</script>
