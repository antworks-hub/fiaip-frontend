<template>
  <div class="row">
    <div class="col-12">
      <card>
        <page-header
          title="NUOVO ALLEGATO"
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
        />
      </card>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import AttachmentForm from './Form.vue'

export default {
  components: { AttachmentForm },

  data () {
    return {
      attachment: {
        name: '',
        attachment_type_id: '',
        file: {
          type: Object,
          default: () => {
            return {}
          }
        },
      },
      isLoading: false,
      apiErrors: {}
    }
  },

  computed: {
    ...mapGetters({
      attachmentTypes: 'attachmentTypes/items'
    })
  },

  created() {
    this.fetchAttachmentTypes()
  },

  methods: {
    ...mapActions({
      uploadAttachment: 'attachments/upload',
      fetchAttachmentTypes: 'attachmentTypes/fetch'
    }),
    handleSubmit () {
      this.isLoading = true
      this.uploadAttachment({ payload: this.attachment, path: '' }).then((res) => {
        this.isLoading = false
        this.$notify({
          message:
            'Allegato creato con successo.',
          timeout: 5000,
          icon: '',
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'success'
        })
        this.$router.push('/gestione-allegati')
      }).catch((err) => {
        this.isLoading = false
        if (err.response.status === 422) {
          this.apiErrors = err.response.data.content.message
        };
      })
    }
  }
}
</script>
<style></style>
