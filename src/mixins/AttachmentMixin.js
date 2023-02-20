import { mapActions } from 'vuex'

export default {
  data () {
    return {
      loaded_attachment_ids: []
    }
  },

  beforeDestroy () {
    if (this.loaded_attachment_ids.length > 0) {
      this.deleteAttachments({ loaded_attachment_ids: this.loaded_attachment_ids })
    }
  },

  methods: {
    ...mapActions({
      uploadAttachment: 'attachments/upload',
      deleteAttachments: 'attachments/delete'
    }),

    onFileChange (evt, path, prop, list = false, staticIndexes = false) {
      const file = evt ? evt : false
      if (file) {
        //const edit = (index || index === 0) && list ? index < (list.length - 1) : false
        this.handleFileUpload(file, path, prop)
      }
    },

    onFileRemove (evt, prop, list = false, keepIndex = false, label = false) {
      const index = evt ? evt.index : false
      this.handleFileCancellation(prop, list, index, keepIndex, label)
    },

    handleFileUpload (file, path, prop, list = false, index = false, staticIndexes = false, edit = false) {
      this.uploadAttachment({ path, file }).then((res) => {
        const attachment = res.data.content.data
        if (file.label) {
          attachment.label = file.label
        }
        this.loaded_attachment_ids.push(attachment.id)
        if (list && (index || index === 0)) {
          const clonedList = [...list]
          clonedList[index] = attachment
          if (!staticIndexes && !edit) {
            clonedList.push({})
          }
          this.updateValue(prop, clonedList)
        } else {
          this.updateValue(prop, attachment)
        }
      })
    },

    handleFileCancellation (prop, list = false, index = false, keepIndex = false, label = false) {
      if (list && (index || index === 0)) {
        let clonedList = [...list]
        if (keepIndex) {
          if (label) {
            clonedList[index] = { label }
          } else {
            clonedList[index] = {}
          }
        } else {
          clonedList = clonedList.filter((att, idx) => idx !== index)
          clonedList[clonedList.length - 1] = {}
        }
        clonedList.forEach((attachment, index) => {
          attachment.key = index
          attachment.ordering = index + 1
        })
        this.updateValue(prop, clonedList)
      } else {
        this.updateValue(prop, null)
      }
    },

    async setupAttachmentsArray (list, prop) {
      const clonedList = [...list]
      let hasEmptyObject = false
      clonedList.forEach((element) => {
        hasEmptyObject = !hasEmptyObject ? Object.keys(element).length === 0 : hasEmptyObject
      })
      if (!hasEmptyObject) {
        clonedList.push({})
      }
      clonedList.forEach((attachment, index) => {
        attachment.key = index
        attachment.ordering = index + 1
      })
      await this.updateValue(prop, clonedList)
    },

    moveAttachmentUp (list, prop, event) {
      const index = event
      const indexes = [(index - 1), index]
      const listClone = [...list]
      listClone.splice(indexes[0], 2, list[indexes[1]], list[indexes[0]])
      listClone.forEach((attachment, index) => {
        attachment.ordering = index + 1
      })
      this.updateValue(prop, listClone)
    },

    moveAttachmentDown (list, prop, event) {
      const index = event
      const indexes = [index, (index + 1)]
      const listClone = [...list]
      listClone.splice(indexes[0], 2, list[indexes[1]], list[indexes[0]])
      listClone.forEach((attachment, index) => {
        attachment.ordering = index + 1
      })
      this.updateValue(prop, listClone)
    }
  }
}
