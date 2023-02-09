<template>
  <div class="mb-2">
    <el-tooltip
      v-if="tooltipText"
      :open-delay="300"
      effect="light"
      placement="bottom"
    >
      <mdicon :width="13" :height="13" name="information" class="mr-1" />
      <div slot="content" v-html="tooltipText" />
    </el-tooltip>
    <label>{{ label }}</label>
    <ckeditor
      v-model="editorValue"
      :editor="editor"
      @ready="onEditorReady"
      @focus="setHeight"
      @blur="setHeight"
      @input="onEditorInput"
      @change="onEditorChange"
    />
  </div>
</template>

<script>
import ViteviniEditor from '@/utils/viteviniEditor.js'

export default {
  name: 'TextEditor',

  props: {
    value: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    height: {
      type: String,
      default: '200px'
    },
    tooltipText: {
      type: String,
      default: null
    }
  },

  data () {
    return {
      editorValue: '',
      editorObject: null,
      editor: ViteviniEditor
    }
  },

  watch: {
    value: {
      handler (val) {
        this.editorValue = val
      },
      immediate: true
    }
  },

  methods: {
    onEditorReady (editor) {
      this.editorObject = editor
    },
    setHeight (event = null) {
      if (this.editorObject) {
        this.editorObject.ui.view.editable.element.style.minHeight = this.height
      }
    },
    onEditorInput (event = null) {
      this.setHeight()
      this.$emit('input', this.editorValue)
    },
    onEditorChange (event = null) {
      this.setHeight()
      this.$emit('change', this.editorValue)
    }
  }
}
</script>
