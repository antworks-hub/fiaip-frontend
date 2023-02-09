<template>
  <div class="row">
    <div class="col-12 mb-2">
      <label>{{ label }}</label>
    </div>
    <div class="col-12">
      <div class="row mb-4">
        <div class="col">
          <div class="row">
            <div v-if="fileExists" class="col-auto multiple-image-upload-img-wrapper">
              <div v-if="src && src.is_video" class="d-flex w-100 h-100 justify-content-center align-items-center">
                <div class="cursor-pointer" @click="showVideo = true">
                  <mdicon name="play" :size="52" />
                </div>
                <div v-if="showVideo" class="swal2-container swal2-center swal2-backdrop-show" style="overflow-y: auto;" @click="showVideo = false">
                  <div class="modal-player" @click.stop>
                    <custom-video-player :video-url="srcFileUrl" />
                  </div>
                </div>
              </div>
              <img v-else :src="srcFileUrl">
            </div>

            <div class="col d-flex align-items-center">
              <div class="row w-100">
                <div class="col-12">
                  <base-input
                    v-model="fileUrl"
                    type="text"
                    style="flex:1; margin-right: 5px;"
                    :placeholder="placeholder"
                    :readonly="isReadonly"
                    @blur="$emit('change', fileUrl)"
                  />
                </div>
                <div v-if="hasLink && fileExists && (!src || !src.is_video)" class="col-12">
                  <base-input
                    v-model="linkAction"
                    type="text"
                    style="flex:1; margin-right: 5px;"
                    placeholder="Link"
                    @input="$emit('linkChange', linkAction)"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-auto d-flex align-items-center justify-content-end">
          <span class="btn btn-primary btn-simple btn-file" style="max-height:40px; margin-left: 5px; margin-bottom: 14px; margin-top: 0px;">
            <span class="fileinput-new">
              {{ fileExists ? changeText : selectText }}
            </span>
            <input type="hidden" value="" name="">
            <input
              ref="fileupload"
              accept="image/*"
              type="file"
              name="..."
              class="valid"
              :multiple="false"
              aria-invalid="false"
              @change="handlePreview"
            >
          </span>
          <base-button v-if="fileExists" round type="success" style="max-height:40px; max-width:110px; margin-bottom: 14px;" @click="openPreview">
            <i class="fas fa-eye" /> {{ previewText }}
          </base-button>
          <base-button v-if="fileExists && removeText" round type="danger" style="max-height:40px; max-width:110px; margin-bottom: 14px;" @click="removeFile">
            <i class="fas fa-times" /> {{ removeText }}
          </base-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ImageUploadLine',
  props: {
    src: {
      type: Object,
      default: () => {
        return {}
      }
    },
    selectText: {
      type: String,
      default: 'Select file'
    },
    changeText: {
      type: String,
      default: 'Change'
    },
    placeholder: {
      type: String,
      default: 'Placeholder'
    },
    label: {
      type: String,
      default: 'Label'
    },
    removeText: {
      type: String,
      default: null
    },
    previewText: {
      type: String,
      default: 'Preview'
    },
    hasLink: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      fileUrl: null,
      fileLabel: null,
      filePreview: null,
      linkAction: null,
      showVideo: false
    }
  },
  computed: {
    srcFileUrl () {
      return this.src && this.src.url ? this.src.url : null
    },
    srcFileLabel () {
      return this.src && this.src.label ? this.src.label : null
    },
    fileExists () {
      return ((this.src && this.src.url) && this.src.url !== null) || this.filePreview !== null
    },
    isReadonly () {
      return ((this.src && this.src.url) && this.src.url !== null) || this.filePreview !== null
    }
  },
  watch: {
    src: {
      handler (val) {
        if (val) {
          this.showVideo = false
          this.fileUrl = this.src.name
          this.fileLabel = this.src.label
          this.linkAction = this.src.details && this.src.details.link ? this.src.details.link : null
        }
      },
      immediate: true
    },
    fileLabel: {
      handler (val) {
        this.$emit('labelChange', val)
      }
    }
  },
  methods: {
    openVideo () {
      document.body.classList.add('no-scrollable')
      this.showVideo = true
    },
    closeVideo () {
      document.body.classList.add('no-scrollable')
      this.showVideo = false
    },
    handlePreview (event) {
      const file = event.target.files[0]
      this.filePreview = URL.createObjectURL(file)
      this.fileUrl = file.name
      this.$emit('change', file)
    },
    openPreview () {
      if (this.src && this.src.url) {
        window.open(this.src.url)
      }
    },
    removeFile () {
      this.showVideo = false
      this.filePreview = null
      this.fileUrl = null
      this.fileLabel = null
      this.$refs.fileupload.value = null
      this.$emit('remove', null)
    }
  }
}
</script>
<style>
</style>
