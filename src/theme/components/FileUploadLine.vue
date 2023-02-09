<template>
  <div class="row">
    <div class="col">
      <div class="row">
        <div :class="srcFileUrl ? 'col-md-6' : 'col'">
          <base-input
            v-model="fileUrl"
            type="text"
            style="flex:1; margin-right: 5px;"
            :label="label"
            :placeholder="placeholder"
            :readonly="isReadonly"
            @blur="$emit('change', fileUrl)"
          />
        </div>
        <div v-if="fileExists" class="col-md-6">
          <base-input
            v-model="fileLabel"
            type="text"
            style="flex:1; margin-right: 5px;"
            label="Nome File"
            placeholder="Nome File"
          />
        </div>
      </div>
    </div>
    <div class="col-lg-auto d-flex align-items-end justify-content-end">
      <span class="btn btn-primary btn-simple btn-file" style="max-height:40px; margin-bottom: 10px; margin-left: 5px;">
        <span class="fileinput-new">{{
          fileExists ? changeText : selectText
        }}</span>
        <input type="hidden" value="" name="">
        <input
          ref="fileupload"
          accept="pdf/*"
          type="file"
          name="..."
          class="valid"
          :multiple="false"
          aria-invalid="false"
          @change="handlePreview"
        >
      </span>
      <base-button v-if="fileExists" round type="success" style="max-height:40px; max-width:110px; margin-bottom: 10px" @click="openPreview">
        <i class="fas fa-eye" /> {{ previewText }}
      </base-button>
      <base-button v-if="fileExists" round type="danger" style="max-height:40px; max-width:110px; margin-bottom: 10px" @click="removeFile">
        <i class="fas fa-times" /> {{ removeText }}
      </base-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'FileUploadLine',
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
      default: 'Remove'
    },
    previewText: {
      type: String,
      default: 'Preview'
    }
  },
  data () {
    return {
      fileUrl: null,
      fileLabel: null,
      filePreview: null
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
          this.fileUrl = this.src.name
          this.fileLabel = this.src.label
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
