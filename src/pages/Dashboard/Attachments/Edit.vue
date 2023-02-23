<template>
  <div class="row">
    <div class="col-12">
      <card>
        <page-header
          title="MODIFICA ALLEGATO"
          :loading="isLoading"
          @backClick="$router.back()"
        />
        <attachment-form
            :attachment="attachment"
            :api-errors="apiErrors"
            :is-loading="isLoading"
            :attachmentTypes="attachmentTypes"
            @submit="handleSubmit"
            @clearErrors="apiErrors = {}"
            @delete="handleDelete"
        />
      </card>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import AttachmentForm from "./Form.vue";

export default {
  components: { AttachmentForm },
  data () {
    return {
      attachmentId: null,
      isLoading: false,
      apiErrors: {}
    }
  },

  created () {
    this.attachmentId = this.$route.params.id
    this.getAttachment(this.attachmentId),
    this.fetchAttachmentTypes()
  },

  beforeDestroy () {
    this.clearAttachment(),
    this.clearAttachmentTypes()
  },

  computed: {
    ...mapGetters({
      attachment: 'attachments/single',
      attachmentTypes: 'attachmentTypes/items'
    })
  },

  methods: {
    ...mapActions({
      getAttachment: 'attachments/get',
      uploadAttachment: 'attachments/upload',
      deleteAttachment: 'attachments/delete',
      reloadAttachment: 'attachments/reload',
      clearAttachment: 'attachments/resetSingle',
      updateValue: 'attachments/updateValue',
      fetchAttachmentTypes: 'attachmentTypes/fetch',
      clearAttachmentTypes: 'attachmentTypes/resetSingle'
    }),
    handleSubmit () {
      this.isLoading = true
      this.uploadAttachment({ payload: this.attachment, path: `/${this.attachmentId}` }).then((res) => {
        this.$notify({
          message:
            'Allegato aggiornato con successo.',
          timeout: 5000,
          icon: '',
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'success'
        })
        this.reloadAttachment().then((res) => {
          this.isLoading = false
          this.$router.push('/gestione-allegati')
        })
      }).catch((err) => {
        this.isLoading = false
        if (err.response.status === 422) {
          this.apiErrors = err.response.data.content.message
        };
      })
    },
    handleDelete () {
      this.isLoading = true
      this.deleteAttachment(this.attachmentId).then((res) => {
        this.isLoading = false
        this.$notify({
          message:
            'Allegato eliminato con successo.',
          timeout: 5000,
          icon: '',
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'success'
        })
        this.$router.push('/gestione-allegati')
      })
    }
  }
}
</script>
<style></style>
