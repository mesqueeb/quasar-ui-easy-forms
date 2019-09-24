import Firebase from 'firebase/app'
import 'firebase/storage'
import { QUploaderBase } from 'quasar'

export default {
  name: 's-uploader',
  mixins: [ QUploaderBase ],
  props: {
    path: String,
  },
  data () {
    const storage = Firebase.storage()
    return {
      storage: storage.ref(),
      activeTasks: []
    }
  },
  computed: {
    // [REQUIRED]
    isUploading () {
      return this.activeTasks.length > 0
    },
    // [optional]
    // shows overlay on top of the
    // uploader signaling it's waiting
    // on something (blocks all controls)
    isBusy () {
      return false
    },
    isIdle () {
      return this.activeTasks.length === 0
    },
  },
  methods: {
    // [REQUIRED]
    // abort and clean up any process
    // that is in progress
    abort () {
      // ...
    },
    // [REQUIRED]
    upload () {
      if (this.disable || !this.queuedFiles.length) { return }
      const files = this.queuedFiles.slice(0)
      this.queuedFiles = []
      files.forEach(file => {
        this.__uploadSingleFile(file)
      })
    },
    __uploadSingleFile (file) {
      const pathPrefix = this.path || ''
      const fileRef = this.storage.child(`${pathPrefix}/${file.name}`)
      this.__updateFile(file, 'uploading', 0)
      const uploadTask = fileRef.put(file)
      this.activeTasks.push(uploadTask)
      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(
        'state_changed',
        snapshot => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          if (file.__status !== 'failed') {
            const loaded = Math.min(snapshot.totalBytes, snapshot.bytesTransferred)
            this.uploadedSize += loaded - file.__uploaded
            this.__updateFile(file, 'uploading', loaded)
          }
        }, error => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          this.queuedFiles.push(file)
          this.__updateFile(file, 'failed')
          this.$emit('failed', { file, error })
          this.uploadedSize -= file.__uploaded
          this.activeTasks = this.activeTasks.filter(t => t !== uploadTask)
        }, () => {
          // Upload completed successfully, now we can get the download URL
          uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            const fullPath = uploadTask.snapshot.ref.fullPath
            const fileName = uploadTask.snapshot.ref.name
            const fileId = fileName.replace(/\./g, '_')
            this.uploadedFiles.push(file)
            this.__updateFile(file, 'uploaded')
            const uploadTime = Math.round(new Date().getTime() / 1000)
            const { size: fileSize, type: fileType } = file
            this.$emit('uploaded', {
              downloadURL,
              fileName,
              fileId,
              fileSize,
              fileType,
              fullPath,
              uploadTime
            })
            this.uploadedSize += file.size - file.__uploaded
          }).catch(error => {
            this.$emit('failed', { file, error })
          })
          this.activeTasks = this.activeTasks.filter(t => t !== uploadTask)
        }
      )
    }
  }
}
