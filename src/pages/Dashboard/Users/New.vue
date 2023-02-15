<template>
  <div class="row">
    <div class="col-12">
      <card>
        <page-header
          title="NUOVO UTENTE"
          :loading="isLoading"
          @backClick="$router.back()"
        />
        <user-form
          v-model="user"
          :api-errors="apiErrors"
          :is-loading="isLoading"
          @submit="handleSubmit"
          @clearErrors="apiErrors = {}"
        />
      </card>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import UserForm from './Form.vue'

export default {
  components: { UserForm },

  data () {
    return {
      user: {
        email: '',
        first_name: '',
        last_name: '',
        password: '',
        password_confirmation: '',
        active: true
      },
      isLoading: false,
      apiErrors: {}
    }
  },

  methods: {
    ...mapActions({
      createUser: 'users/create'
    }),
    handleSubmit () {
      this.isLoading = true
      this.createUser({ payload: this.user }).then((res) => {
        this.isLoading = false
        this.$notify({
          message:
            'Utente creato con successo.',
          timeout: 5000,
          icon: '',
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'success'
        })
        this.$router.push('/utenti')
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
