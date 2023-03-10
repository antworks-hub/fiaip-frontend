<template>
  <div class="row">
    <div class="col-12">
      <card>
        <page-header
          title="VISUALIZZA ERRORE"
          :loading="isLoading"
          @backClick="$router.back()"
        />
        <div class="row">
          <div class="col-12 mt-3">
            <div class="row mt-2">
              <div class="col-md-4">Utente</div>
              <div class="col-md-8">{{ this.error.user.full_name }}</div>
            </div>
            <div class="row mt-2">
              <div class="col-md-4">Data inserimento</div>
              <div class="col-md-8">{{ this.error.date }}</div>
            </div>
            <div class="row mt-2">
              <div class="col-md-4">Stato segnalazione</div>
              <div class="col-md-8">{{ this.error.error_status.status }}</div>
            </div>
            <div class="row mt-2">
              <div class="col-md-4">Titolo</div>
              <div class="col-md-8"><p>{{ this.error.title }}</p></div>
            </div>
            <div class="row mt-2">
              <div class="col-md-4">Testo segnalazione</div>
              <div class="col-md-8"><p>{{ this.error.text }}</p></div>
            </div>
          </div>
        </div>
      </card>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
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
    })
  },

  created () {
    this.errorId = this.$route.params.id
    this.getError(this.errorId),
    this.fetchErrorStatuses()
  },

  beforeDestroy () {
    this.clearError(),
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
        this.$router.push('/errori')
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
        this.$router.push('/errori')
      })
    }
  }
}
</script>
<style></style>
