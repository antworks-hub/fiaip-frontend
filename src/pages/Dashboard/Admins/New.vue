<template>
  <div class="row">
    <div class="col-12">
      <card>
        <page-header
          title="NUOVO AMMINISTRATORE"
          :loading="isLoading"
          @backClick="$router.back()"
        />
        <admin-form
          v-model="admin"
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
import AdminForm from './Form.vue'

export default {
  components: { AdminForm },

  data () {
    return {
      admin: {
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
      createAdmin: 'admins/create'
    }),
    handleSubmit () {
      this.isLoading = true
      this.createAdmin({ payload: this.admin }).then((res) => {
        this.isLoading = false
        this.$notify({
          message:
            'Amministratore creato con successo.',
          timeout: 5000,
          icon: '',
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'success'
        })
        this.$router.push('/amministratori')
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
