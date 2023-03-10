<template>
  <div class="row">
    <div class="col-12">
      <card>
        <page-header
          title="MODIFICA ERRORE"
          :loading="isLoading"
          @backClick="$router.back()"
        />
        <error-form
          :value="error"
          :api-errors="apiErrors"
          :is-loading="isLoading"
          :errorStatuses="errorStatuses"
          :user="user"
          type="admin"
          @submit="handleSubmit"
          @delete="handleDelete"
          @input="updateValue($event)"
          @clearErrors="apiErrors = {}"
        />
      </card>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import ErrorForm from '../Form.vue'

export default {
  components: { ErrorForm },
  data () {
    return {
      userId: null,
      isLoading: false,
      apiErrors: {}
    }
  },

  computed: {
    ...mapGetters({
      error: 'errors/single',
      errorStatuses: 'errorStatuses/items',
      user: 'auth/user',
    })
  },

  created () {
    this.errorId = this.$route.params.id
    this.getError(this.errorId),
    this.fetchErrorStatuses()
  },

  beforeDestroy () {
    this.clearError()
    this.clearErrorStatuses()
  },

  methods: {
    ...mapActions({
      getError: 'errors/get',
      updateError: 'errors/update',
      deleteError: 'errors/delete',
      clearError: 'errors/resetSingle',
      updateValue: 'errors/updateValue',
      fetchErrorStatuses: 'errorStatuses/fetch',
      clearErrorStatuses: 'errorStatuses/resetSingle'
    }),
    handleSubmit () {
      this.isLoading = true
      this.updateError({ id: this.errorId, payload: this.error }).then((res) => {
        this.$notify({
          message:
            'Segnalazione aggiornata con successo.',
          timeout: 5000,
          icon: '',
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'success'
        })
        this.isLoading = false
      }).catch((err) => {
        this.isLoading = false
        if (err.response.status === 422) {
          this.apiErrors = err.response.data.content.message
        };
      })
    },
    handleDelete () {
      this.isLoading = true
      this.deleteError(this.errorId).then((res) => {
        this.isLoading = false
        this.$notify({
          message:
            'Segnalazione eliminata con successo.',
          timeout: 5000,
          icon: '',
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'success'
        })
        this.$router.push('/gestione-errori')
      })
    }
  }
}
</script>
<style></style>
