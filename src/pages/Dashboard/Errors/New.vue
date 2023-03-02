<template>
  <div class="row">
    <div class="col-12">
      <card>
        <page-header
          title="NUOVO ERRORE"
          :loading="isLoading"
          @backClick="$router.back()"
        />
        <error-form
          v-model="error"
          :api-errors="apiErrors"
          :is-loading="isLoading"
          :errorStatuses="errorStatuses"
          @submit="handleSubmit"
          @clearErrors="apiErrors = {}"
        />
      </card>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import ErrorForm from './Form.vue'

export default {
  components: { ErrorForm },

  data () {
    return {
      error: {
        title: '',
        text: '',
        error_status_id: 1,
      },
      isLoading: false,
      apiErrors: {}
    }
  },

  created () {
    this.fetchErrorStatuses()
  },

  beforeDestroy () {
    this.clearErrorStatuses()
  },

  computed: {
      ...mapGetters({
        errorStatuses: 'errorStatuses/items',
        user: 'auth/user',
      })
  },

  methods: {
    ...mapActions({
      createError: 'errors/create',
      fetchErrorStatuses: 'errorStatuses/fetch',
      clearErrorStatuses: 'errorStatuses/resetSingle'
    }),
    handleSubmit () {
      this.isLoading = true
      this.error.user_id = this.user.id
      this.createError({ payload: this.error }).then((res) => {
        this.isLoading = false
        this.$notify({
          message:
            'Segnalazione creata con successo.',
          timeout: 5000,
          icon: '',
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'success'
        })
        this.$router.push('/errori')
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
