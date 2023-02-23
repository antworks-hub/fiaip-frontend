<template>
  <div class="row">
    <div class="col">
      <base-input
        v-model="fileLabel"
        type="text"
        style="flex:1; margin-right: 5px;"
        :label="label"
        :placeholder="placeholder"
        readonly
      >
      </base-input>
    </div>
    <div class="col-lg-auto d-flex align-items-end justify-content-end">
      <span class="btn btn-primary btn-simple btn-file" style="max-height:40px; margin-bottom: 10px; margin-left: 5px;">
        <span class="fileinput-new">{{
            fileExists ? changeText : selectText
          }}</span>
        <input type="hidden" value="" name="" />
        <input
          accept="pdf/*"
          ref="fileupload"
          @change="handlePreview"
          type="file"
          name="..."
          class="valid"
          :multiple="false"
          aria-invalid="false"
        />
      </span>
      <base-button v-if="fileExists" @click="openPreview" round type="success" style="max-height:40px; max-width:110px; margin-bottom: 10px">
        <i class="fas fa-eye"></i> {{ previewText }}
      </base-button>
      <base-button v-if="fileExists && removable" @click="removeFile" round type="danger" style="max-height:40px; max-width:110px; margin-bottom: 10px">
        <i class="fas fa-times"></i> {{ removeText }}
      </base-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'file-upload',
  props: {
    src: null,
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
    },
    removable: {
      type: Boolean,
      default: true
    },
  },
  data() {
    return {
      fileUrl: this.src ? this.src.url : null,
      fileLabel: this.src ? this.src.label : null,
      filePreview: null
    };
  },
  watch: {
    fileUrl: {
      handler(val) {
        if(!this.filePreview) {
          this.$emit('change', val);
        }
      }
    },
    fileLabel: {
      handler(val) {
        this.$emit('labelChange', val)
      }
    }
  },
  computed: {
    srcFileUrl() {
      return this.src && this.src.url ? this.src.url : null
    },
    srcFileLabel() {
      return this.src && this.src.label ? this.src.label : null
    },
    fileExists() {
      return ((this.src && this.src.url) && this.src.url !== null) || this.filePreview !== null;
    }
  },
  methods: {
    handlePreview(event) {
      let file = event.target.files[0];
      this.filePreview = URL.createObjectURL(file);
      this.fileLabel = file.name;
      this.$emit('change', file);
    },
    openPreview() {
      if(this.filePreview) {
        window.open(this.filePreview);
      } else if(this.fileUrl) {
        if(!(this.fileUrl.includes('http://') || this.fileUrl.includes('https://'))) {
          window.open('https://' + this.fileUrl);
        } else {
          window.open(this.fileUrl);
        }
      }
    },
    removeFile() {
      this.filePreview = null;
      this.fileUrl = null;
      this.fileLabel = null
      this.$refs.fileupload.value = null;
      this.$emit('remove', null);
    }
  }
};
</script>
<style>
</style>
