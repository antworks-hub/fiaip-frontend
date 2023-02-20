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
          :userLevels="userLevels"
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
        active: false,
        user_level_id: '',
        address: '',
        agency_name: '',
        email_pec: '',
        phone_number: '',
        member_code: ''
      },
      isLoading: false,
      apiErrors: {}
    }
  },

  created() {
    this.fetchUserLevels()
  },

  beforeDestroy() {
    this.clearUserLevels()
  },

  computed: {
    ...mapGetters({
      userLevels: 'userLevels/items'
    })
  },

  methods: {
    ...mapActions({
      createUser: 'users/create',
      fetchUserLevels: 'userLevels/fetch',
      clearUserLevels: 'userLevels/resetSingle'
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
