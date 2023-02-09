<template>
  <div>
    <div v-for="(element, index) in list" :key="element[listKey]" class="d-flex flex-row">
      <div class="d-flex flex-column align-items-center justify-content-center mr-3">
        <span
          v-if="index > 0 && (index < list.length - 1)"
          @click="$emit('onMoveAttachmentUp', index)"
        >
          <mdicon name="chevron-up" />
        </span>
        <span
          v-if="list.length > 1 && index < (list.length - 2)"
          @click="$emit('onMoveAttachmentDown', index)"
        >
          <mdicon name="chevron-down" />
        </span>
      </div>
      <file-upload-line
        style="flex: 1 1 auto;"
        :src="element"
        :label="`Documento ${index + 1}`"
        placeholder="Inserisci l'URL oppure carica un documento"
        select-text="Seleziona Documento"
        change-text="Cambia"
        remove-text="Rimuovi"
        @linkChange="element.details.link = $event"
        @labelChange="element.label = $event"
        @change="$emit('onFileChange', {$event, index})"
        @remove="$emit('onFileRemove', {$event, index})"
      />
    </div>
  </div>
</template>

<script>
import { FileUploadLine } from 'src/theme/components/index'

export default {
  name: 'MultipleFileUpload',

  components: {
    FileUploadLine
  },

  props: {
    list: {
      type: Array,
      default: () => {
        return []
      }
    },
    listKey: {
      type: String,
      default: 'key'
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
